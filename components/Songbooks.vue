<template lang="html">


    <section class="perspective">
        <transition name="fliphide" mode="out-in">

            <div
            key="notdone"
            class="box"
            v-if="!sbClicked">
                <h3>Add to:</h3>
                <span
                @click="addTab(songbook.id)"
                v-for="(songbook, index) in songbooks"
                :class="{ chosensongbook: sbClicked }"
                :key="index">
                {{songbook.name}}
            </span>
        </div>

            <div class="box"
                key="done"
                v-if="sbClicked" id="added" >
                <h3>
                    &#x1F44D
                </h3>
                Added!
            </div>

        </transition>
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
            added: false
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
                // emmit hide event
                this.sbClicked = !this.sbClicked
                setTimeout(this.hide, 1000)
            })
            .catch(err => console.log("ERR: ", err))
        },
        hide(){
            console.log("This took 1 second");
            this.$emit("hideAdder")
        }
    }
}
</script>

<style scoped>
.perspective {
    perspective: 600px;
    z-index: 10;
    position: absolute;
    left: -26%;
    top: .5em;
}
.box {
    background: #222;
    border: 2px solid darkorange;
    padding: 1em;
}
h3 {
    text-align: center;
}
span {
    display: block;
    text-align: left;
    font: normal 1em/150% "Muli", sans-serif;
    padding: .2em 0;
    cursor: pointer;
}
span:hover {
    color: darkorange;
}
#added {
    font: normal 1.5em/150% "Muli", sans-serif;
}
/* ANIMATIONS */
.fliphide-enter-active {
    transition: all ease-out .2s;
}
.fliphide-leave-active {
    transition: all ease-in .2s;
}
.fliphide-enter {
    transform: rotateY(90deg);
    opacity: .5;
}
.fliphide-leave-to {
    transform: rotateY(-90deg) ;
    opacity: .5;
}
</style>
