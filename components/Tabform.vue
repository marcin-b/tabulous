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

            console.log("type ", this.newTab.type);
            console.log("has lyrics? ", this.newTab.hasLyrics);
            console.log("Title ", this.newTab.title);
            console.log("Title ", this.newTab.tab);
            //create new obj for the song.

            console.log(this.newTab);
        }
    }
}
</script>

<style lang="css">

</style>
