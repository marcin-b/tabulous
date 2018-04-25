<template lang="html">

    <form class="form" @submit.prevent="tabAdd">

		<div class="options">
			<select v-model="newTab.type" id="type" class="type" name="type">
				<option selected value="guitar">Guitar</option>
				<option value="chords">Chords</option>
				<option value="bass">Bass</option>
			</select>
			<input v-model="newTab.haslyrics" class="checkbox" type="checkbox">With Lyrics?
		</div>

		<input v-model="newTab.title" type="text" id="title" placeholder="Song Title" autofocus>
		<input v-model="newTab.artist" type="text" id="artist" placeholder="Artist">
		<textarea v-model="newTab.tab" type="text" id="tabinput" name="tab" value=""></textarea>
		<button id="submit-btn" type="submit">Submit</button>

	</form>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    props: [ "tabFormShown" ],
    data() {
        return {
            sortedTabs: [{}],
            newTab: {
                title: "",
                artist: "",
                type: "guitar",
                haslyrics: false,
                tab: ""
            }
        }
    },
    methods: {
        tabAdd() {
            axios.post("/api/addtab", this.newTab)
                .then(({ data }) => {
                    console.log(data);
                    this.$emit("hide")
                    this.$emit("tabadded")
                    // empty all fields
                    this.newTab = {
                        title: "",
                        artist: "",
                        type: "guitar",
                        haslyrics: "false",
                        tab: ""
                    }
                })
                .catch(err => console.log("Problem adding Tab: ", err))
        }
    },
    mounted() {
        axios.get('/api/getcsrftoken')
            .then((response) => {
                axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
            })
            .catch(err => console.log("Error getting Token: ", err))
    },
}
</script>

<style scoped>
.form {
    align-items: center;
    border: 2px dashed #999;
    background-color: #222;
    color: #eee;
    display: flex;
    flex-direction: column;
    font: normal 1em/133% "Muli", sans-serif;
    margin: .8em 0 1em;
    position: absolute;
    padding: 1em;
    z-index: 2;
    top: 12em;
    overflow: auto;
}
.form > input {
    border: 1px solid black;
    font: normal 1.2em/150% "Muli", sans-serif;
    padding-left: .5em;
    margin-bottom: 1em;
    height: 2em;
    width: 250px;
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
#tabinput {
    border: 1px solid black;
    color: black;
    font: normal 1em "Inconsolata", monospace;
    height: 400px;
    margin-bottom: 1em;
    padding: .5em;
    width: 650px;
}
#submit-btn {
    border: 1px solid darkorange;
    box-shadow: 1px 2px 3px #000;
    background-color: darkorange;
    color: #000;
    cursor: pointer;
    display: inline-block;
    font: normal 1.4em/150% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin-bottom: 0;
    padding: 0 1em;
    width: auto;
    transition: transform ease .1s;

}
#submit-btn:hover {
    background-color: #222;
    border: 1px solid #ccc;
    color: darkorange;
    transform: scale(1.3, 1.3);
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all ease .5s;
}
.slide-fade-enter {
    transform: translateX(100vw) scale(0 , 0);
}
.slide-fade-leave-to {
    transform: scale(2,2) translateX(-100vw);
}
</style>
