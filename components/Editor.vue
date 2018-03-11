<template lang="html">

    <form @submit.prevent="updateTab" class="tab-editor">

        <button @click="closeEditor" type="button" id="close-editor">
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

        <button type="submit" id="update-tab">
            Update
        </button>

    </form>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    name: "Editor",
    props: [ "tab" ],
    data() {
        return {
            sortedTabs: [{}],
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
        updateTab() {
            axios.post("/api/update-tab", this.updatedTab)
                .then(({data}) => {
                    console.log("update result", data);
                    this.closeEditor()
                })
        },
        closeEditor() {
            this.$emit("close")
        },
    },
}
</script>

<style scoped lang="css">
.tab-editor {
    border: 2px dashed #999;
    font-weight: normal;
    display: block;
    background-color: #222;
    padding: 1em;
    position: absolute;
    margin-bottom: 1em;
    z-index: 1;
}
.tab-editor > textarea {
    border: 1px solid black;
    color: black;
    font: normal normal .9em/100% "Inconsolata", monospace;
    display: block;
    height: 400px;
    /* position: absolute; */
    padding: .5em;
    width: 650px;
    white-space: pre;
}
input {
    border: 1px solid black;
    font: normal 1em/150% "Muli", sans-serif;
    display: block;
    padding-left: .5em;
    margin-bottom: .5em;
    width: 220px;
}
input:focus, textarea:focus, select:focus {
    border: 1px solid darkorange;
}
select {
    border: 1px solid black;
    padding: 0 .8em;
    font: normal 1em/100% "Muli", sans-serif;
}
.options {
    display: flex;
    margin-bottom: 10px;
    align-items: flex-start;
}
.checkbox {
    height: 18px;
    width: 18px;
    margin-bottom: 5px;
    margin-left: .8em;
    vertical-align: middle;
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
    transform-origin: right;
}
button:hover {
    color: darkorange;
    transform: scale(1.3, 1.3);
}
#close-editor {
    position: absolute;
    left: -8em;
    top: -2em;
}
#update-tab {
    color: darkorange;
    font-size: 1.2em;
    /* position: absolute;
    left: -6em;
    top: 0; */
    transform-origin: center;
}
</style>
