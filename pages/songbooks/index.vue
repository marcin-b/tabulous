<template lang="html">

    <section>

        <ul>

            <li
            v-if="songbooks"
            v-for="(songbook, index) in songbooks"
            :key="index">

                <nuxt-link
                    :tabs="songbook.tabs"
                    :to="'/songbooks/' + songbook.id">
                    {{songbook.name}}
                </nuxt-link>

                <span v-if="songbook.tabs && songbook.tabs.length === 1" class="accent">
                    {{songbook.tabs.length}} song
                </span>
                <span v-else-if="songbook.tabs" class="accent">
                    {{songbook.tabs.length}} songs
                </span>
                <span v-else class="accent">
                    no songs
                </span>
            </li>

            <li v-else>Create your first Songbook!</li>

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
            return { songbooks: data }
        })
        .catch(err => console.log("Error getting SB: ", err))
    },
    watch: {
        addedSongbook(newSongbook, songbooks) {
            this.songbooks.unshift(newSongbook)
        }
    },
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
li {
    width: 400px;
    position: relative;
    border-bottom: 1px dashed #444
}
li, a {
    color: white;
    font: normal normal 1.2em/150% "Lato", sans-serif;
    text-decoration: none;
}
a {
    display: inline;
}
span {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: .8em;
}
</style>
