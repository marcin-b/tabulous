<template lang="html">
    <div class="tab-container">
        <ul>
            <li v-for="(tabs, letter) in sortedTabs" :key="letter" v-bind:id="letter" class="abc">
                {{letter}}
                <ul>
                    <li v-for="tab in tabs">
                        <nuxt-link :to="{ name: '', params: { id: tab.id}}">
                            {{ tab.title }} - {{ tab.artist }}
                            <span v-if="tab.hasLyrics">has lyrics</span><br>
                        </nuxt-link>
                        <pre v-if="shown">{{ tab.tab }}</pre>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="">
            Here are some cool tabs
        </div>

    </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
    data () {
        return {
            sortedTabs: [{}]
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
    margin-top: 3em;

}
.abc {
    color: darkorange;
    font-size: 1.3em;
}

ul > li > a {
    display: block;
    color: #eee;
    font: normal normal 600 1em/150% "Lato", sans-serif;
    letter-spacing: .08em;
    text-decoration: none;
    transition: transform ease-out .1s;

}
ul > li > a:hover {
    color: darkorange;
    text-shadow: 1px 2px 3px #000;
    transform: translateY(-2px);
}
pre {
    padding-top: 10px;
    /* margin-left: -25px; */
    font: normal 1em "Inconsolata", monospace;
    background-color: #ddd;
    color: #222;
    border-top: 1px solid darkorange;
    border-bottom: 1px solid #ddd;
    max-width: 100vw;
}
</style>
