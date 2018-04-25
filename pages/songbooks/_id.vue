<template lang="html">
    <section>
        <nuxt-link
            to="/songbooks" id="back-to"
            v-if="$store.state.authUser">
            <span class="accent"><-</span> back to your Songbooks
        </nuxt-link>
        <nuxt-link
            to="/" id="back-to"
            v-else>
            <span class="accent"><-</span> Home
        </nuxt-link>


        <h2>{{songbook.name}}</h2>

        <div class="col-cont pos-rel persp">
            <span id="give-away">Wanna share?</span>
            <transition name="xflip" mode="out-in" >
                <button
                    v-if="!sharing"
                    @click="copyToClipboard"
                    type="button"
                    id="link"
                    key="copy">
                    Copy Link
                </button>

                <button v-else type="button" id="sharer" key="copied">copied</button>
            </transition>

        </div>
        <input v-if="mounted" id="share" :value="url" />

        <ul>
            <li v-if="!tabs || tabs.length === 0" id="get-started">
                <i>
                    No songs in this Songbook yet.
                </i>
                <nuxt-link to="/" id="starter">
                    Let's change that!
                </nuxt-link>

            </li>

            <li
                v-else
                v-for="(tab, index) in tabs"
                :key="index"
                @mouseover.stop="songHovered = index"
                @mouseleave.stop="songHovered = false" >

                <nuxt-link
                    :key="index"
                    :to="`/tab/${tab.id}`" >
                {{tab.title}} - {{tab.artist}}
                <span v-if="tab.ver > 0">ver{{tab.ver}}</span>
                </nuxt-link>

                <span>
                    <span class="accent">{{ tab.type }}</span>

                    <span v-if="tab.haslyrics">
                        |
                        <span class="accent">lyrics</span>
                    </span>

                </span>

                <span
                    title="Delete Tab from Songbook"
                    @click="deleteTab(tab.id, index)"
                    :class="{ hovered: songHovered }"
                    v-if="$store.state.authUser && songHovered === index && songbook.owner_id === $store.state.authUser.id"
                    id="del-tab">
                    X
                </span>

            </li>
        </ul>

        <div v-if="$store.state.authUser && songbook.owner_id === $store.state.authUser.id"
            id="del">
            <button
            @click="deleteSb"
            type="button"
            id="delete-sb" >
            Delete
            </button>
            <span>this Songbook</span>

        </div>

    </section>
</template>

<script>
import axios from "~/plugins/axios"

export default {
    middleware: null,
    data() {
        return {
            mounted: false,
            sharing: false,
            url: "",
            songbook: {},
            tabs: [],
            songHovered: false,
        }
    },
    asyncData(context) {
        return axios.get("/api/songbook/" + context.params.id)
        .then(({data}) => {
            return {
                songbook: data.songbook,
                tabs: data.tabs
            }
        })
        .catch(err => console.log("get SB err: ", err))
    },
    mounted() {
        this.mounted = true;
        this.url = window.location.href
    },
    methods: {
        deleteSb() {
            // Confirm before delete
            if (confirm("Are you sure you want to delete this Songook?")) {

                axios.delete("/api/delete-songbook/" + this.$route.params.id)
                .then(({data}) => {
                    this.$router.replace("/songbooks")
                })
                .catch(err => console.log("Error deleting SB: ", err))
            }
        },
        copyToClipboard() {
            this.sharing = true
            var href = document.getElementById('share')
            console.log("clicked and true", document.getElementById('share').value);
            href.focus()
            href.select()
            // document.getElementById('share').innerHTML.select()
            console.log(document.execCommand('copy'));
            this.hide()

        },
        hide() {
            setTimeout(() =>{
                this.sharing = false
                console.log("now false", this.sharing)
            }, 2000)
        },
        deleteTab(tabId, index) {
            let info = {
                tabId,
                sbId: this.$route.params.id
            }
            if (confirm("Are you sure you want to remove this Song?")) {
                axios.post("/api/delete-song-from-songbook/", info)
                .then(({data}) => {
                    this.tabs.splice(index, 1)
                })
                .catch(err => console.log("Error removing tab: ", err))
            }
        }
    },
    head() {
        return { title: this.songbook.name }
    },
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#back-to {
    outline: 5px dotted #444;
    color: #eee;
    display: block;
    font: normal normal 1em/150% "Inconsolata", monospace;
    text-decoration: none;
    padding: 0 1em;
    margin: 1em 0;
    transition: all ease .2s;
}
#back-to:hover, #back-to:active, #back-to:focus {
    outline: 5px dotted #FF8C00;
}
ul {
    margin-bottom: 2em;
}
li {
    border-bottom: 1px dashed #444;
    position: relative;
    padding-right: 2em;
}
li > a {
    color: #eee;
    display: inline-block;
    font: normal 400 1.4em/150% "Lato", sans-serif;
    position: relative;
    text-decoration: none;
    letter-spacing: .03em;
    margin: 0;
    padding-right: 3.3em;
    transition: transform ease .1s;
    transform-origin: left;
    transform: scale(.9, .9);
    text-shadow: none;
}
a > span {
    font-size: 1em;
    color: #999;
}
li > a:hover {
    text-shadow: 1px 2px 2px #000;
    text-decoration: underline darkorange;
    transform: scale(1, 1);
}
li > span {
    font: normal  400 .7em/200% "Lato", sans-serif;
    align-self: flex-end;
    padding-bottom: 2px;
    position: absolute;
    right: 2em;
    bottom: 0;
    z-index: 1;
}
#get-started {
    border: 0;
}
i {
    display: block;
}
i, #del, #sharer, #link, #delete-sb, #give-away  {
    font: normal normal 1.1em/150% "Inconsolata", monospace;
}
#give-away { font-size: 1em; }
#starter {
    transform-origin: center;
    text-decoration: underline darkorange;
    margin: 1em 0;
}
input {
    background: transparent;
    border: 0;
}
.accent {
    color: darkorange;
}
#delete-sb, #link, #sharer {
    cursor: pointer;
    background: none;
    padding: 0 1em;
}
#link, #sharer {
    border: 1px dashed #666;
    margin: .5em 0 1.5em;
    color: darkorange;
}
#sharer {
    border: 1px solid yellowgreen;
    background: yellowgreen;
    color: black;
}
#link:hover, #link:active, #link:focus {
    border-color: darkorange;
    color: black;
    background: darkorange;
}
#delete-sb {
    font-size: 1em;
    border: 0;
    color: red;
    margin-right: .5em;
    margin-top: 1em;
    transition: color ease .1s, background ease .1s;
}
#delete-sb:hover {
    background: red;
    color: black;
}
#del-tab {
    position: absolute;
    right: .5em;
    cursor: pointer;
}
#share {
    position: fixed;
    color: transparent;
    z-index: -999;
    bottom: -10em;
    height: 1px;
}
/* transitions */
.xflip-enter-active, :hover.xflip-enter-active {
    transition: all ease .1s;
}
.xflip-leave-active, :hover.xflip-leave-active, :active.xflip-leave-active, :focus.xflip-leave-active {
    transition: all ease .1s;
}
.xflip-enter, :hover.xflip-enter {
    transform: rotateY(90deg);
}
.xflip-leave-to, :hover.xflip-leave-to {
    transform: rotateY(-90deg);
}
</style>
