<template>
    <section>

        <my-header/>

        <Nav/>

        <nuxt-link @click.native="$router.back()" to="/songbooks" id="back-to">
            <span class="accent"><-</span> Back
        </nuxt-link>

        <h2>
            {{tab.title}} - {{tab.artist}}
            <span v-if="tab.ver > 0">ver{{tab.ver}}</span>
        </h2>

        <div class="relative">
            <!-- Add to Songbook Button -->
            <button
                v-if="$store.state.authUser"
                @click="toggleAdder"
                type="button"
                id="add-to-sb">
                Add to Songbook
            </button>

            <transition name="slidein">
                <Songbooks
                @hideAdder="toggleAdder"
                v-if="showAdder"
                :tabId="tab.id" />
            </transition>

            <!-- Edit Button -->
            <button
                v-if="$store.state.authUser && tab.creator_id == $store.state.authUser.id"
                @click="toggleEditor"
                type="button"
                id="open-editor">
                Edit
            </button>


        </div>
        <div class="positioner">
            <!-- Editor -->
            <transition name="slide">
                <Editor
                @update="updateTab"
                @deleted="$router.back()"
                @close="toggleEditor"
                v-if="showEditor"
                :tab="tab"/>
            </transition>

        </div>

        <!-- Scroller -->
        <Scroller />

        <pre>{{tab.tab}}</pre>


    </section>
</template>

<script>
import axios from "~/plugins/axios"

import Scroller from '~/components/Scroller.vue'
import MyHeader from '~/components/Header.vue'
import Songbooks from '~/components/Songbooks.vue'
import Nav from '~/components/Nav.vue'
import Editor from '~/components/Editor.vue'

export default {
    components: {
        Songbooks,
        MyHeader,
        Nav,
        Scroller,
        Editor
    },
    data() {
        return {
            showAdder: false,
            showEditor: false,
            tab: {},
        }
    },
    asyncData(context) {
        return axios.get("/api/tab/" + context.params.id)
        .then(({data}) => {
            return {
                tab: data
            }
        })
        .catch(err => console.log("get Tab err: ", err))
    },
    head() {
        return { title: this.tab.title }
    },
    methods: {
        toggleAdder() {
            this.showAdder = !this.showAdder
        },
        toggleEditor() {
            this.showEditor = !this.showEditor
        },
        updateTab(update) {
            this.tab = update
        },
    }
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
pre {
    width: auto;
}
h2 > span {
    font-size: 1em;
    color: #999;
}
#back-to {
    outline: 5px dotted #444;
    color: #eee;
    display: block;
    font: normal normal 1em/150% "Inconsolata", monospace;
    text-decoration: none;
    padding: 0 1em;
    margin: 1em 0;
    transition: all ease .1s;
}
#back-to:hover, #back-to:active, #back-to:focus {
    outline: 5px dotted #FF8C00;
}
.relative {
    /* display: ; */
    position: relative;
    margin-bottom: 1em;
    /* width: 450px; */
}
button {
    background-color: #222;
    color: #eee;
    border: 1px solid darkorange;
    cursor: pointer;
    font: normal 1em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em;
    padding: .2em 1em;
    box-shadow: 1px 2px 3px #000;
    transition: all ease .1s;
    /* position: absolute;
    top: -103px; */
}
button:hover {
    color: black;
    background: darkorange;
    transform: none;
}
#open-editor {
    /* position: absolute;
    right: 20%;
    z-index: 6; */
}
.positioner {
    width: 450px;
}
</style>
