<template lang="html">
    <div class="tab-container">
        <div
            v-if="!tabsLoaded"
            class="loader-cont">

            Loading Tabs...

            <div class="loader">
                T
            </div>

        </div>
        <ul v-else>
            <li v-for="(tabs, letter) in sortedTabs"
            :key="letter"
            v-bind:id="letter"
            class="abc">
                <span>{{letter}}</span>
                <ul>
                    <Tab name="Tab" v-for="(tab, index) in tabs" :key="index" :tab="tab"/>
                </ul>
            </li>
        </ul>


    </div>
</template>

<script>

import axios from '~/plugins/axios'
import Tab from "~/components/Tab.vue"

export default {
    components: { Tab },
    data() {
        return {
            tabsLoaded: false,
            sortedTabs: [{}],
        }
    },
    mounted() {
        axios.get("/api/tabs")
            .then(({data}) => {
                this.sortedTabs = data
                this.tabsLoaded = true;
                console.log("tabs:", this.sortedTabs);
            })
            .catch(err => console.log("Error getting tabs:", err))
    },
    methods: {

    }
}
</script>


<style lang="css">
.tab-container {
    font: normal bold 1.2em/150% "Muli", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #222;
    color: #eee;
}
.abc {

}
/* List Letter Elements */
.abc > span {
    /* border-bottom: 1px solid white; */
    color: darkorange;
    display: block;
    font-size: 1.3em;
    padding: 1em 0 0;
    text-align: left;
    text-shadow: 1px 2px 3px #000;
}
.loader-cont {
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222;
    font-size: 3.3em;
    width: 100px;
    height: 100px;
    background-color: darkorange;
    border-radius: 10px;
    font-family: "Rock Salt";
    font-weight: bold;
    animation-name: load;
    animation-duration: 800ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transition: all;
}
@keyframes load {
    0% { transform: scale(1, 1) translateY(0) ; opacity: .8; }
    /* 25% { transform: scale(.8, .8) ; opacity:.8;} */
    50% { transform: scale(.1, .1) translateX(0) ; opacity: .2; }
    /* 75% { transform: scale(.8, .8); opacity:.8; } */
    100% { transform: scale(1, 1) translateY(0) ; opacity: .8; }
}
</style>
