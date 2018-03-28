<template lang="html">

    <li>
        <h2 @click="toggleTab" :class="{ activeclass: isActive}">
            {{ updatedTab.title }} - {{ updatedTab.artist }}
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
                    Close Tab
                </button>

                <button
                    v-if="$store.state.authUser"
                    @click="toggleAdder"
                    type="button"
                    id="add-to-sb">
                    Add to<br> Songbook<br>
                </button>

                <transition name="slidein">
                    <Songbooks
                        v-if="showAdder"
                        :tabId="updatedTab.id" />
                </transition>

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
import Songbooks from '~/components/Songbooks.vue'


export default {
    components: { Scroller, Editor, Songbooks },
    name: "Tab",
    props: [ "tab" ],
    data () {
        return {
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
        },
        toggleAdder() {
            this.showAdder = !this.showAdder
            console.log("HERE", this.showAdder);
        },
    },

}
</script>

<style scoped>

/* Single Tab Item */
li {
    /* display: flex;
    align-content: flex-end;
    justify-content: space-between; */
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
    /* float: right; */

    z-index: 1;
}
.accent {
    color: darkorange;
}
/* Actual Tab Pre Element */
.pre-tab-container {
    position: relative;
    align-self: flex-start;
    left: -26%;
    z-index: 3;
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
    font: normal normal 1.1em/110% "Inconsolata", monospace;
    letter-spacing: -.4px;
    padding: 1em 1.5em;
    margin-bottom: 3em;
    text-shadow: 0px 1px 0px #fff;
    text-rendering: optimizeLegibility;
    width: 700px;
    white-space: pre-wrap;
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
    right: -52%;
    top: -2.2em;
    z-index: 6;
}
#add-to-sb {
    position: absolute;
    left: 0;
    top: -3em;
    z-index: 6;

}
#add-to-sb:hover {
    transform: none;
    color: darkorange;
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

/* the adder */
.slidein-leave-active, .slidein-enter-active {
    transform-origin: left;
    transition: all ease .4s;
}
.slidein-enter {
    transform: scale(0, 0) translateX(-400px);

}
.slidein-leave-to {
    transform: scale(0, 0) translateX(-400px);
}
</style>
