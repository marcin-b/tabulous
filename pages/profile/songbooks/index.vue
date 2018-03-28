<template lang="html">

<section>

    <ul>
        <li v-if="songbooks.length === 0">Create your first Songbook!</li>
        <li
        v-else
        v-for="(songbook, index) in songbooks"
        :key="index">

            <nuxt-link
                :tabs="songbook.tabs"
                :to="'/profile/songbooks/' + songbook.id">
                {{songbook.name}}
            </nuxt-link>
        </li>
    </ul>


</section>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    props: ["addedSongbook"],
    data() {
        return {
            songbooks: []
        }
    },
    asyncData(context) {
        return axios.get("/api/songbooks")
        .then(({data}) => {
            console.log("get SB: ", data)
            return {
                songbooks: data
            }
        })
        .catch(err => console.log("get SB err: ", err))
    },
    watch: {
        addedSongbook(newSongbook, songbooks) {
            this.songbooks.unshift(newSongbook)
        }
    },
    methods: {

    }
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
li, a {
    color: white;
    font: normal normal 1em/150% "Muli", sans-serif;
    text-decoration: none;
}

</style>
