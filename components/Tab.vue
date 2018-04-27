<template lang="html">

    <li>
        <h2 @click="toggleTab" :class="{ activeclass: isActive}">
            {{ updatedTab.title }} - {{ updatedTab.artist }}
            <span v-if="updatedTab.ver > 0">ver{{updatedTab.ver}}</span>

        </h2>
        <span>
            <span class="accent">{{ updatedTab.type }}</span>

            <span v-if="updatedTab.haslyrics">
                |
                <span class="accent">lyrics</span>
            </span>

        </span>

        <!-- Tab Block -->
        <transition name="slide">
            <div v-if="isActive" class="pre-tab-container">

                <button @click="toggleTab" type="button" id="close-tab">
                    Close <span>[esc]</span>
                </button>

                <!-- Add to Songbook Button -->
                <button
                    v-if="$store.state.authUser"
                    @click="toggleAdder"
                    type="button"
                    id="add-to-sb">
                    Add to<br> Songbook<br>
                </button>

                <transition name="slidein">
                    <Songbooks
                        @hideAdder="toggleAdder"
                        v-if="showAdder"
                        :tabId="updatedTab.id" />
                </transition>

                <!-- Edit Button -->
                <button
                    v-if="$store.state.authUser && tab.creator_id == $store.state.authUser.id"
                    @click="toggleEditor"
                    type="button"
                    id="open-editor">
                    Edit
                </button>


                <!-- Tab container -->
                <div class="pre-cont">
                    <pre>{{ updatedTab.tab }}</pre>
                </div>

                <!-- Scroller -->
                <Scroller
                v-if="transEnd"
                @closetab="toggleTab" />
            </div>

            <!-- Editor -->
            <Editor
            @update="updateTab"
            @deleted="tabDelete"
            @close="toggleEditor"
            v-if="showEditor"
            :tab="updatedTab"/>

        </transition>

    </li>

</template>

<script>
import axios from '~/plugins/axios'

import Scroller from '~/components/Scroller.vue'
import Editor from '~/components/Editor.vue'
import Songbooks from '~/components/Songbooks.vue'

export default {
    components: { Scroller, Editor, Songbooks },
    name: "Tab",
    props: [ "tab" ],
    data () {
        return {
            transEnd:false,
            showAdder: false,
            isActive: false,
            showEditor: false,
            updatedTab: {
                title: this.tab.title,
                artist: this.tab.artist,
                type: this.tab.type,
                haslyrics: this.tab.haslyrics,
                tab: this.tab.tab,
                id: this.tab.id,
                "creator_id": this.tab.creator_id,
                ver: this.tab.ver
            },
        }
    },
    mounted() {
    },
    methods: {
        toggleTab() {
            // this.isActive = !this.isActive
            // Adjust document height & show scroller only after transition so avoid "jumping"
            if (!this.isActive) {
                this.isActive = true
                setTimeout(() => {
                    this.transEnd = true
                    document.getElementById('pushcont').style.height = (document.documentElement.scrollHeight + document.getElementsByTagName("footer")[0].clientHeight + 10) + "px";
                }, 550)
            } else {
                // small timeout so scroller is hidden when tab closes
                setTimeout(() => this.isActive = false, 10)
                this.transEnd = false
                setTimeout(() => {
                    document.getElementById('pushcont').style.height = " 100%"
                }, 500)
            }
        },
        toggleEditor() {
            this.showEditor = !this.showEditor
            this.toggleTab()
        },
        updateTab(update) {
            this.updatedTab = update
        },
        tabDelete() {
            this.$emit("tabdeleted")
            this.toggleTab
        },
        toggleAdder() {
            this.showAdder = !this.showAdder
        },
    },

}
</script>

<style scoped>
h2 > span {
    font-size: 1em;
    color: #999;
}
/* Single Tab Item */
li {
    border-bottom: 1px dashed #444;
    position: relative;
}
li > h2 {
    color: #eee;
    cursor:pointer;
    display: inline-block;
    font: normal 400 1.4em/150% "Lato", sans-serif;
    letter-spacing: .03em;
    margin: 0;
    transform: scale(.9, .9);
    transition: transform ease .1s;
    transform-origin: left;
    text-shadow: none;
    z-index: 1;
}
li > h2:hover {
    text-shadow: 1px 2px 2px #000;
    text-decoration: underline darkorange;
    transform: scale(1, 1);
}
li > span {
    font: normal  400 .7em/200% "Lato", sans-serif;
    align-self: flex-end;
    padding-bottom: 2px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
}

/* Actual Tab Pre Element */
.pre-tab-container {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
}
.pre-cont {
    background-color: #222;
    display: flex;
    height: auto;
    overflow: visible;
    padding: .5em;
    position: absolute;
}
button {
    background-color: #222;
    color: #eee;
    border: 1px solid #eee;
    cursor: pointer;
    font: normal 1em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em;
    padding: 0 .5em;
    box-shadow: 1px 2px 3px #000;
    transition: transform ease .1s;
}
button:hover {
    color: darkorange;
    transform: scale(1.3, 1.3);
}

/* Contol Buttons */
#close-tab {
    background-color: #eee;
    color: #222;
    position: absolute;
    right: -26%;
    top: -2.2em;
    z-index: 6;
}
#close-tab > span {
    font-size: .9em;
}
#add-to-sb {
    position: absolute;
    left: -26%;
    top: -3em;
    z-index: 6;
}
#add-to-sb:hover {
    transform: none;
    color: darkorange;
}
#open-editor {
    position: absolute;
    right: -20%;
    top: 1em;
    z-index: 6;
}
</style>
