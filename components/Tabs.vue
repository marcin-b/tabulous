<template lang="html">
    <div class="tab-container">
        <ul>
            <li v-for="(tabs, letter) in sortedTabs" :key="letter" v-bind:id="letter" class="abc">
                {{letter}}
                <ul>
                    <li v-for="(tab, index) in tabs" @click="show = !show" :key="index" :id="tab.id" >
                        <nuxt-link
                        :id="tab.id"
                        :to="tab.id"
                        >
                            {{ tab.title }} - {{ tab.artist }}
                        </nuxt-link>
                        <span v-if="tab.haslyrics == 'true'">has lyrics</span>
                        <transition name="slide-fade" >
                            <pre v-if="show">{{ tab.tab }}</pre>
                        </transition>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="">

        </div>

    </div>
</template>

<script>
import axios from '~/plugins/axios'
import Tab from "~/components/Tab.vue"

export default {

    data () {
        return {
            sortedTabs: [{}],
            show: false

        }
    },
    mounted () {
        axios.get("/api/tabs")
            .then(({data}) => {

                console.log("tab get resp data:", data);
                this.sortedTabs = data
                console.log("tabs:", this.sortedTabs);
            })
            .catch(err => console.log("Error getting tabs:", err))
    },
    async asyncData () {
        let { tabulatures } = await axios.get('/api/tabs')
        console.log("tabulatures:", tabulatures);
        return { tabulatures }
    },
    methods: {
        singleTab(event) {
            event.preventDefault()
            console.log("target", event.target.id);
            axios.get("/api/tab/" + event.target.id)
                .then(({data}) => {
                    this.pickedTab = data
                })

        }
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
    margin-top: 1em;
}
.abc {
    color: darkorange;
    font-size: 1.3em;
}

ul > li > a {
    display: inline-block;
    color: #eee;
    font: normal normal 600 .9em/150% "Lato", sans-serif;
    letter-spacing: .08em;
    text-decoration: none;
    transition: transform ease-out .1s;
}
ul > li > a:hover {
    color: darkorange;
    text-shadow: 1px 2px 3px #000;
    transform: translateY(-2px);
}
ul > li > span {
    margin-left: 1em;
    font-size: .5em;
}
pre {
    padding-top: 10px;
    /* margin-left: -25px; */
    font: normal .6em "Inconsolata", monospace;
    background-color: #ddd;
    color: #222;
    border: 1px solid darkorange;
    width: 700px;
    white-space: pre-wrap;
}
</style>
