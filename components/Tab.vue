<template lang="html">

    <li>
        <a @click="toggleTab" :class="{ activeclass: isActive}">
            {{ updatedTab.title }} - {{ updatedTab.artist }}
        </a>
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
                    Close Tab
                </button>

                <button
                    v-if="$store.state.authUser && updatedTab.creator_id == $store.state.authUser.id"
                    @click="toggleEditor"
                    type="button"
                    id="open-editor">
                    Edit
                </button>

                <!-- Scroller -->
                <Scroller/>

                <!-- Tab container -->
                <div class="pre-cont">
                    <pre>{{ updatedTab.tab }}</pre>
                </div>

            </div>
        </transition>

        <!-- Editor -->
        <transition name="fade">
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


export default {
    components: { Scroller, Editor },
    name: "Tab",
    props: [ "tab" ],
    data () {
        return {
            isActive: false,
            showEditor: false,
            updatedTab: {
                title: this.tab.title,
                artist: this.tab.artist,
                type: this.tab.type,
                haslyrics: this.tab.haslyrics,
                tab: this.tab.tab,
                id: this.tab.id,
                "creator_id": this.tab.creator_id
            },
        }
    },

    methods: {
        toggleTab() {
            this.isActive = !this.isActive
        },
        toggleEditor() {
            this.showEditor = !this.showEditor
            this.toggleTab()
        },
        updateTab(update) {
            this.updatedTab = update
        },
        tabDelete() {
            console.log("@ tab delete");
            this.$emit("tabdeleted")
            this.toggleTab
        }
    },

}
</script>

<style lang="css" scoped>

/* Single Tab Item */
li > a {
    color: #eee;
    cursor:pointer;
    display: inline-block;
    font: normal normal 400 1.1em/150% "Lato", sans-serif;
    letter-spacing: .03em;
    transition: transform ease .1s;
    transform-origin: left;
}
li > a:hover {
    text-shadow: 1px 2px 2px #000;
    text-decoration: underline darkorange;
    transform: scale(1.1, 1.1);
}
li > span {
    font-weight: normal;
    margin-left: 1em;
    font-size: .5em;

}
.accent {
    color: darkorange;
}
/* Actual Tab Pre Element */
.pre-tab-container {
    position: relative;
    left: -26%;
}
.pre-cont {
    background-color: #222;
    display: flex;
    height: auto;
    overflow: visible;
    padding: .5em;
    position: absolute;
    /* left: 100px; */
}
pre {
    background-color: #eee;
    background-image: url(~/assets/img/rice-paper.png);
    border: 1px solid #aaa;
    box-shadow: inset 0px 2px 5px 0px #222;
    color: #000;
    font: normal normal .95em/110% "Inconsolata", monospace;
    letter-spacing: -.4px;
    padding: .8em;
    margin-bottom: 3em;
    text-shadow: 0px 1px 0px #fff;
    text-rendering: optimizeLegibility;
    width: 700px;
    white-space: pre-wrap;
    z-index: 1;
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
    /* left: -.5em; */
    top: -1.9em;
    z-index: 6;
}

#open-editor {
    position: absolute;
    right: -45%;
    top: 1em;
    z-index: 6;
}

/* Animations */

/* Tab <pre> */
.slide-enter-active, .slide-leave-active {
    transition: all ease .5s;
}
/* .slide-fade-leave-active below version 2.1.8 */
.slide-enter
{
    /* transform: translateX(-100vw); */
    transform: translateX(100vw);
    /* opacity: 0; */
}
.slide-leave-to {
    /* transform: translateX(-100vw); */
    transform: translateX(-100vw);
    /* opacity: 0; */
}

/* Editor */
.fade-leave-active, .fade-enter-active {
    transition: all ease .5s;
}
.fade-enter {
    transform: translateX(100vw);
}
.fade-leave-to {
    transform: translateX(-100vw);
}
.activeclass {

    text-shadow: 1px 2px 3px #000;
}
</style>
