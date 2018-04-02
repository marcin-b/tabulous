<template lang="html">
    <section>
        <nuxt-link to="/profile/songbooks" id="back-to">
            <span class="accent"><-</span> back to your Songbooks
        </nuxt-link>
        <h2>{{songbook.name}}</h2>

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
                </nuxt-link>

                <span>
                    <span class="accent">{{ tab.type }}</span>

                    <span v-if="tab.haslyrics">
                        |
                        <span class="accent">lyrics</span>
                    </span>



                </span>
                <span
                    @click="deleteTab(tab.id, index)"
                    :class="{ hovered: songHovered }"
                    v-if="songHovered === index && songbook.owner_id === $store.state.authUser.id"
                    id="del-tab">
                    X
                </span>

            </li>
        </ul>

        <div v-if="songbook.owner_id === $store.state.authUser.id">
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
    data() {
        return {
            songbook: {},
            tabs: [],
            songHovered: false,
        }
    },
    asyncData(context) {
        return axios.get("/api/songbook/" + context.params.id)
        .then(({data}) => {
            console.log("get SB: ", data)
            return {
                songbook: data.songbook,
                tabs: data.tabs
            }
        })
        .catch(err => console.log("get SB err: ", err))
    },

    methods: {
        deleteSb() {
            // Confirm before delete
            if (confirm("Are you sure you want to delete this Songook?")) {

                axios.delete("/api/delete-songbook/" + this.$route.params.id)
                .then(({data}) => {
                    this.$nuxt.$router.replace("/profile/songbooks")
                    console.log("delete result", data)

                })
                .catch(err => console.log("Error deleting SB: ", err))
            }
        },
        deleteTab(tabId, index) {
            let info = {
                tabId,
                sbId: this.$route.params.id
            }
            console.log("tab id: ", info);
            if (confirm("Are you sure you want to remove this Song?"))
             {
                axios.post("/api/delete-song-from-songbook/", info)
                .then(({data}) => {
                    this.tabs.splice(index, 1)
                })
                .catch(err => console.log("Error removing tab: ", err))
            }

        }
    }
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
i, div > span {
    font: normal normal 1em/150% "Inconsolata", monospace;
}
#starter {
    transform-origin: center;
    text-decoration: underline darkorange;
    margin: 1em 0;
}
.accent {
    color: darkorange;
}
#delete-sb {
    cursor: pointer;
    color: red;
    font: normal normal 1em/150% "Inconsolata", monospace;
    background: none;
    border: 1px solid #eee;
    padding: 0 1em;
    margin-top: 1em;
    margin-right: 1em;
}
#del-tab {
    position: absolute;
    right: .5em;
    cursor: pointer;
}
.hovered {

}
</style>
