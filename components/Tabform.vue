<template lang="html">
    <form class="form">
		<div class="options">
			<select v-model="newTab.type" id="type" class="type" name="type">
				<option selected value="guitar">Guitar</option>
				<option value="bass">Bass</option>
			</select>
			<input v-model="newTab.hasLyrics" class="checkbox" type="checkbox">With Lyrics?
		</div>

		<input v-model="newTab.title" type="text" id="title" placeholder="Song Title" autofocus>
		<input v-model="newTab.artist" type="text" id="artist" placeholder="Artist">
		<textarea v-model="newTab.tab" type="text" id="tabinput" name="tab" value=""></textarea>
		<input id="submit-btn" type="submit" @click="tabAdd"  value="Submit">
	</form>
</template>

<script>
import axios from "~/plugins/axios"

export default {
    data() {
        return {
            newTab: {
                title: "",
                type: "guitar",
                artist: "",
                hasLyrics: false,
                tab: ""
            }
        }
    },
    methods: {
        tabAdd(e) {
            e.preventDefault();
            console.log("new Tab", this.newTab);
            axios.post("/api/addtab", this.newTab)
                .then(({ data }) => {
                    console.log("resp data:", data);
                })
        }
    }
}
</script>

<style lang="css">
.form {
    align-items: center;
    display: flex;
    flex-direction: column;
    font: normal 1em/150% "Muli", sans-serif;
    padding-top: 1em;
    background-color: #222;
    color: #ccc;
}
.form > input {
    border: 1px solid black;
    font: normal 1em "Muli", sans-serif;
    padding-left: .8em;
    margin-bottom: 1em;
    height: 2em;
    width: 200px;
}
.form > input:focus, .form > textarea:focus, select:focus {
    border: 1px solid darkorange;
}
.options {
    margin-bottom: 10px;
}
select {
    border: 1px solid black;
    padding: 3px 10px;
    font: normal 1em/100% "Muli", sans-serif;
}
.checkbox {
    height: 1.5em;
    width: 1.5em;
    margin-bottom: 5px;
    margin-left: .8em;
    vertical-align: middle;
}
#tabinput {
    border: 1px solid black;
    color: black;
    font: normal 1em "Inconsolata", monospace;
    min-height: 300px;
    margin-bottom: 1em;
    padding: .5em;
    width: 516px;
}
#addtab, #submit-btn {
    border: 1px solid darkorange;
    background-color: darkorange;
    color: #222;
    cursor: pointer;
    display: inline-block;
    font: bold 1.6em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin-bottom: 1em;
    padding: 0;
    width: 150px;
    height: 1.6em;
}
#addtab:hover, #submit-btn:hover {
    /* text-shadow: none; */
    background-color: #222;
    color: darkorange;
    border: 1px solid #ccc;
}
</style>
