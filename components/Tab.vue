<template lang="html">

    <li>
        <a @click="toggleTab" :class="{ activeclass: isActive}">
            {{ updatedTab.title }} - {{ updatedTab.artist }}
        </a>
        <span v-if="updatedTab.haslyrics">has lyrics</span>

        <!-- Tab Block -->
        <transition name="slide">
            <div v-if="isActive" class="pre-tab-container">

                <button @click="toggleTab" type="button" id="close-tab">
                    Close Tab
                </button>

                <button @click="toggleEditor" type="button" id="open-editor">
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
                @close="showEditor = false"
                v-if="showEditor"
                :tab="tab"/>
            <!--
            <div v-if="showEditor" class="tab-editor">

                <button @click="toggleEditor" type="button" id="close-editor">
                    Close Editor
                </button>

                <div class="options">
                    <select v-model="updatedTab.type" id="type" class="type" name="type">
                        <option selected value="guitar">Guitar</option>
                        <option value="bass">Bass</option>
                    </select>
                    <input v-model="updatedTab.haslyrics" class="checkbox" type="checkbox">With Lyrics?
                </div>


                Title <input v-model="updatedTab.title" type="text" id="title" >
                Artist <input v-model="updatedTab.artist" type="text" id="artist">

                <textarea v-model="updatedTab.tab" name="tab">
                    {{ updatedTab.tab }}
                </textarea>

                <button @click="updateTab" type="button" id="update-tab">
                    Update
                </button>

            </div>
             -->
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
                id: this.tab.id
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
        updateTab() {
            axios.post("/api/update-tab", this.updatedTab)
                .then(({data}) => {
                    console.log("update result", data);
                    this.toggleEditor();
                })
        },
    },

}
</script>

<style lang="css" scoped>

/* Single Tab Item */
li > a {
    color: #eee;
    cursor:pointer;
    display: inline-block;
    font: normal normal 400 1em/150% "Lato", sans-serif;
    letter-spacing: .03em;
    text-decoration: none;
    transition: all ease-out .1s;
}
li > a:hover {
    /* color: darkorange; */
    text-shadow: 1px 2px 3px #000;
    transform: scale(1.3, 1.3);
    /* transform: translateY(-2px); */
}
li > span {
    font-weight: normal;
    margin-left: 1em;
    font-size: .5em;
    color: darkorange;
}
/* Actual Tab Pre Element */
.pre-tab-container {
    position: relative;

}
.pre-cont {
    /* border: 2px dashed #999; */
    position: absolute;
    height: auto;
    padding: .5em;
    display: flex;
    background-color: #222;
    overflow: visible;
}
pre {
    background-color: #ddd;
    border: 1px solid #aaa;
    box-shadow: inset 0px 2px 5px 0px #222;
    color: #111;
    font: normal .95em "Inconsolata", monospace;
    letter-spacing: -.5px;
    padding: .8em;
    /* position: absolute; */
    text-shadow: 0px 1px 0px #fff;
    width: 700px;
    white-space: pre-wrap;
    z-index: 1;
}
/* Contol Buttons */
#close-tab {
    position: absolute;
    left: -6.7em;
    top: -2em;
}

#open-editor {
    position: absolute;
    left: -4em;
}

#update-tab:hover, #update-tab:focus {
    color: #000;
    background-color: darkorange;
    border-color: darkorange;
    font-weight: bold;
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
