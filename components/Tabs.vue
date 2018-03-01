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
/* List Letter Elements */
.abc > span {
    /* border-bottom: 1px solid white; */
    color: darkorange;
    display: block;
    font-size: 1.3em;
    padding: 1em 0 0;
    text-align: left;
}

</style>
