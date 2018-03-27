<template lang="html">

    <section>

        <span
        v-for="(songbook, index) in songbooks"
        :key="index">
            {{songbook.name}}
        </span>

    </section>

</template>

<script>
import axios from '~/plugins/axios'

export default {
    name: "Songadder",
    data() {
        return {
            songbooks: []
        }
    },
    created() {
        axios.get("/api/songbooks")
        .then(({data}) => {
            console.log("get SB: ", data)
            this.songbooks = data

        })
        .catch(err => console.log("get SB err: ", err))
    },
}
</script>

<style scoped>
section {
    background: #222;
    border: 2px solid darkorange;
    padding: 1em;
    position: absolute;
    left: .5em;
    top: .5em;
    z-index: 10;
}

</style>
