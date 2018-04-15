<template>
    <section>

        <my-header/>

        <Nav/>

        <nuxt-link @click.native="$router.back()" to="/profile/songbooks" id="back-to">
            <span class="accent"><-</span> Back
        </nuxt-link>

        <h2>{{tab.title}} - {{tab.artist}}</h2>

        <!-- Add to Songbook Button -->
        <div class="relative">
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

        </div>

        <Scroller />

        <pre>{{tab.tab}}</pre>

    </section>
</template>

<script>
import axios from "~/plugins/axios"

import MyFooter from '~/components/Footer.vue'
import Scroller from '~/components/Scroller.vue'
import MyHeader from '~/components/Header.vue'
import Songbooks from '~/components/Songbooks.vue'
import Nav from '~/components/Nav.vue'

export default {
    components: {
        Songbooks,
        MyHeader,
        Nav,
        Scroller,
        MyFooter,
    },
    data() {
        return {
            showAdder: false,
            tab: {}
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
            console.log("HERE", this.showAdder);
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
.relative {
    display: block;
    position: relative;
    width: 500px;
    height: 10px;
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
    transition: transform ease .1s;
    position: absolute;
    top: -103px;
    left: 0%;
}
button:hover {
    color: black;
    background: darkorange;
    transform: none;
}
/* adder trasition */
.slidein-leave-active, .slidein-enter-active {
    transform-origin: left;
    transition: all ease .4s;
}
.slidein-enter {
    transform: scale(0, 0) translateX(-400px);
    opacity: 0.5;
}
.slidein-leave-to {
    transform: scale(0, 0) translateX(-400px);
    opacity: 0.5;
}
</style>
