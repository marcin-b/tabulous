<template lang="html">
    <div class="ed-container">

        <form @submit.prevent="updateTab" class="tab-editor">

            <div class="meta-cont">

                <div class="small-cont">
                    Title <input v-model="updatedTab.title" type="text" id="title" required />
                </div>
                <div class="small-cont">
                    Artist <input v-model="updatedTab.artist" type="text" id="artist" required />
                </div>

                <div class="options">
                    <div class="check-cont">
                        <input v-model="updatedTab.haslyrics" class="checkbox" type="checkbox" />
                        With Lyrics?
                    </div>
                    <select v-model="updatedTab.type" id="type" class="type" name="type">
                        <option selected value="guitar">Guitar</option>
                        <option value="chords">Chords</option>
                        <option value="bass">Bass</option>
                    </select>
                </div>

            </div>

            <textarea v-model="updatedTab.tab" name="tab">
                {{ updatedTab.tab }}
            </textarea>

            <button type="submit" id="update-tab">
                Save changes
            </button>

            <button @click="closeEditor" type="button" id="close-editor">
                Close Editor
            </button>

            <button @click="deleteTab" type="button" id="delete-tab">
                Delete Tab
            </button>

        </form>

    </div>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    name: "Editor",
    props: [ "tab" ],
    data() {
        return {
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
        closeEditor() {
            this.$emit("close")
        },
        updateTab() {
            axios.post("/api/update-tab", this.updatedTab)
            .then(({data}) => {
                console.log("update result", data);
                this.$emit("update", this.updatedTab)
                this.closeEditor()
            })
        },
        deleteTab() {
            // Confirm before delete
            if (confirm("Are you sure you want to delete the Tab?")) {
                axios.delete("/api/delete-tab", {data: {id: this.updatedTab.id}})
                .then((resp) => {
                    this.closeEditor()
                    this.$emit("deleted")
                })
                .catch(err => console.log("delete error: ", err))
            }
        }
    },
}
</script>

<style scoped lang="css">
.ed-container {
    position: relative;
    left: -21%;
    z-index: 3;
}
.tab-editor {
    background-color: #222;
    border: 2px dashed #999;
    display: block;
    font-weight: normal;
    font-size: 1.1em;
    margin: 0 0 1em;
    padding: .5em .5em 1em;
    position: absolute;
}
.meta-cont {
    display: flex;
    justify-content: space-around;
}
.small-cont {
    display: inline-block;
}
input {
    border: 1px solid black;
    font: normal 1em/150% "Muli", sans-serif;
    display: block;
    padding-left: .5em;
    margin-top: .5em;
    width: 220px;
}
input:focus, textarea:focus, select:focus {
    border: 1px solid darkorange;
}
.tab-editor > textarea {
    border: 1px solid black;
    color: black;
    font: normal normal .9em/100% "Inconsolata", monospace;
    display: block;
    height: 350px;
    padding: .5em;
    margin: .5em 0;
    width: 650px;
    white-space: pre;
}
.options {
    margin-bottom: 10px;
}
select {
    border: 1px solid black;
    font: normal 1em/100% "Muli", sans-serif;
    padding: 0 .8em;
}
.check-cont {
    display: flex;
    font-size: .9em;
    align-items: center;
}
.checkbox {
    height: 18px;
    width: 18px;
    margin: 5px;
}
button {
    background-color: #222;
    color: #eee;
    border: 1px solid #eee;
    cursor: pointer;
    font: normal 1em/140% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .3em .6em;
    padding: 0 .6em;
    box-shadow: 1px 2px 3px #000;
    transition: all ease .1s;
}
button:hover {
    color: darkorange;
    transform: scale(1.3, 1.3);
}
#close-editor {
    background: #eee;
    color: #222;
}
#update-tab {
    border-color: darkorange;
    background: darkorange;
    color: #000;
    font-size: 1em;
    transform-origin: center;
}
#delete-tab {
    color: red;
    align-self: flex-end;
    position: absolute;
    right: 0;
}
#update-tab:hover, #update-tab:focus {
    color: #000;
    background-color: darkorange;
    border-color: darkorange;
}
#delete-tab:hover, #delete-tab:focus {
    color: #000;
    background-color: red;
    border-color: red;
    transform: none;
}
</style>
