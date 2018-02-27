<template lang="html">

    <li>
        <a @click="toggleTab" :class="{ activeclass: isActive}">
            {{ updatedTab.title }} - {{ updatedTab.artist }}
        </a>
        <span v-if="updatedTab.haslyrics">has lyrics</span>

        <!-- Tab and Editor block -->
        <transition name="slide">
            <div v-if="isActive" class="pre-tab-container">

                <button @click="toggleEditor" type="button" id="open-editor">
                    Edit
                </button>
                <pre>
                    {{ updatedTab.tab }}
                </pre>
            </div>
        </transition>

        <!-- Editor -->
        <transition name="fade">
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
                <input v-model="updatedTab.title" type="text" id="title" >
                <input v-model="updatedTab.artist" type="text" id="artist">
                <button @click="updateTab" type="button" name="edit-tab">
                    Update
                </button>
                <textarea v-model="updatedTab.tab" name="tab">
                    {{ updatedTab.tab }}
                </textarea>

            </div>
        </transition>

    </li>

</template>

<script>
import axios from '~/plugins/axios'

export default {

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
            }

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

                })
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
    letter-spacing: .08em;
    text-decoration: none;
    transition: transform ease-out .1s;
}
li > a:hover {
    color: darkorange;
    text-shadow: 1px 2px 3px #000;
    transform: translateY(-2px);
}
li > span {
    font-weight: normal;
    margin-left: 1em;
    font-size: .5em;
    color: darkorange;
}
/* Actual Tab Pre Element */
.pre-tab-container {
    position: absolute;
}
pre {
    background-color: #eee;
    border: 1px solid darkorange;
    color: #222;
    font: normal .9em "Inconsolata", monospace;
    /* margin-left: -25px; */
    padding: .8em;
    position: absolute;
    width: 700px;
    white-space: pre-wrap;
    z-index: 1;
}
#open-editor {
    position: absolute;

    left: -4em;
}
#close-editor {

}
.tab-editor > textarea {
    border: 1px solid black;
    color: black;
    font: normal .9em/100% "Inconsolata", monospace;
    height: 400px;
    margin-bottom: 1em;
    position: absolute;
    padding: .5em;
    width: 650px;
}
/* button {
    background-color: #222;
    color: darkorange;
    border: 1px solid #ccc;
    cursor: pointer;
    display: block;
    font: bold 1em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em;
    padding: 0 .5em;
    position: relative;
    box-shadow: 1px 2px 3px #000;
} */


/* Animations */
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
.fade-leave-active {
    transition: all ease .5s;
}
.fade-leave-to {
    opacity: 0;
}
.activeclass {
    color: darkorange;
    text-shadow: 1px 2px 3px #000;
}
</style>
