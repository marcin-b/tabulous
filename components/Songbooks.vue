<template lang="html">

    <section>
        <h3>Add to:</h3>
        <span
            @click="addTab(songbook.id)"
            v-for="(songbook, index) in songbooks"
            :class="{ chosensongbook: sbClicked }"
            :key="index">
            {{songbook.name}}
        </span>

    </section>

</template>

<script>
import axios from '~/plugins/axios'

export default {
    name: "Songadder",
    props: ["tabId"],
    data() {
        return {
            songbooks: [],
            sbClicked: false,
        }
    },
    beforeCreate() {
        axios.get("/api/songbooks")
        .then(({data}) => {
            console.log("get SBs: ", data)
            this.songbooks = data

        })
        .catch(err => console.log("get SB err: ", err))
    },
    methods: {
        addTab(sbId) {
            console.log("SB ID:", sbId);
            let info = {
                sbId,
                tabId: this.tabId
            }
            axios.post("/api/add-tab-to-songbook", info)
            .then(res => {
                console.log("sb res: ", res);
            })
            .catch(err => console.log("ERR: ", err))
        },
        pickSongbook(sb){
            this.sbClicked = !this.sbClicked
        }
    }
}
</script>

<style scoped>
section {
    background: #222;
    border: 2px solid darkorange;
    /* justify-content: flex-start;
    align-content: flex-start; */
    align-items: flex-start;
    padding: 1em;
    position: absolute;
    left: .5em;
    top: .5em;
    z-index: 10;
}
h3 {
    align-self: center;
}
span {
    text-align: left;
    font: normal 1em/150% "Muli", sans-serif;
    padding: .2em 0;
    cursor: pointer;
}
span:hover {
    color: darkorange;
}

</style>
