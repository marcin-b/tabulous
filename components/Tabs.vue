<template lang="html">
    <div class="tab-container">
        <ul>
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
    data () {
        return {
            sortedTabs: [{}],
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

}
.abc > span {
    /* background-color: #eee; */
    border-bottom: 1px solid khaki;
    color: darkorange;
    display: block;
    font-size: 1.3em;
    padding: 1em 0 0;
    text-align: left;
}
ul > li:first-child {

}
ul > li > a {
    color: #eee;
    cursor:pointer;
    display: inline-block;
    font: normal normal 400 1.1em/150% "Lato", sans-serif;
    letter-spacing: .08em;
    text-decoration: none;
    transition: transform ease-out .1s;
}
ul > li > a:hover {
    color: darkorange;
    text-shadow: 1px 2px 3px #000;
    transform: translateY(-2px);
}
li > ul > li > span {
    font-weight: normal;
    margin-left: 1em;
    font-size: .5em;
    color: darkorange;
}

</style>
