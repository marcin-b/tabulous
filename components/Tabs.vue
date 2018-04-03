<template lang="html">

    <div class="tab-container">

        <!-- Loader -->
        <div
            v-if="!tabsLoaded"
            class="loader-cont">

            Loading Tabs...

            <div class="loader">
                T
            </div>

        </div>

        <ul v-else>
            <li
                v-for="(tabs, letter) in sortedTabs"
                :key="letter"
                v-bind:id="letter"
                class="abc">
                    <span>{{letter}}</span>
                    <ul>
                        <Tab
                            @tabdeleted="updateAfterDelete"
                            name="Tab"
                            v-for="(tab, index) in tabs"
                            :key="index"
                            :tab="tab"/>
                    </ul>
            </li>
        </ul>

    </div>
</template>

<script>

import axios from '~/plugins/axios'

import Tab from "~/components/Tab.vue"

export default {
    props: ["update"],
    components: { Tab },
    data() {
        return {
            tabsLoaded: false,
            sortedTabs: [{}],
        }
    },
    watch: {
        update() {
            this.tabsLoaded = false
            this.getTabs()
        }
    },
    created() {
        this.getTabs()
    },
    methods: {
        getTabs() {
            axios.get("/api/tabs")
            .then(({data}) => {
                this.sortedTabs = data
                this.tabsLoaded = true;
            })
            .catch(err => console.log("Error getting tabs:", err))
        },
        updateAfterDelete() {
            this.tabsLoaded = false
            this.getTabs()
        }
    }
}
</script>


<style scoped>
.tab-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #222;
    color: #eee;
}

/* List Letter Elements */
.abc > span {
    border-bottom: 1px solid #666;
    color: darkorange;
    display: block;
    font: normal 400 1.2em/150% "Muli", sans-serif;
    padding: 1em 0 0;
    text-align: left;
}
/* LOADER */
.loader-cont {
    font: normal normal 1.2em/150% "Muli", sans-serif;
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
