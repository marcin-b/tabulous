<template>

    <section>
        <form @submit.prevent="getResults" class="search">
            <input
            @focus="showResults = true"
            @blur="hideSearch"
            @input="search"
            v-model="value"
            type="text" />

            <button type="submit">
                <img src="~/assets/img/null.png" alt="">
            </button>


            <ul v-if="value && showResults">

                <li v-if="results.length === 0" class="nofound">No results :(</li>

                <li
                    v-for="(result, index) in results" :key="index">
                    <nuxt-link :to="`/tab/${result.id}`">
                        {{result.title}} - {{result.artist}}
                    </nuxt-link>
                </li>

            </ul>

        </form>
    </section>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    data() {
        return {
            value: "",
            results: [],
            showResults: false,
        }
    },
    methods: {
        search() {
            if (this.value) {
                axios.get("/api/tab-search?search=" + this.value)
                .then(results => {
                    this.results = results.data.slice(0, 6)
                })
                .catch(err => console.log("Search error: ", err))
            }
        },
        getResults() {
            this.$nuxt.$router.push({ path: '/results', query: { search: this.value }})
        },
        hideSearch(){
            // Add timeout otherwise links are not clickable, because
            // they are hidden too fast
            setTimeout(() => this.showResults = false, 100)
        }
    }
}
</script>

<style scoped>
.search {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 9;
}
input {
    border: 1px solid #eee;
    font: normal 1.2em/100% "Muli", sans-serif;
    height: 1.8em;
    width: 300px;
    padding: 0 0 0 .5em;
}
input:focus {
    border: 1px solid darkorange;
    outline: 0;
}
button {
    background-color: transparent;
    border: 1px solid #eee;
    cursor: pointer;
    height: 2.6em;
    margin: 0 .3em;
    padding: .2em .3em;
    width: 2.7em;
}
button:hover {
    background-color: rgba(0, 0, 0, .5);

}
button > img {
    align-self: center;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg)
}
ul {
    width: 300px;
    background: #222;
    border: 2px dashed darkorange;
    position: absolute;
    top: 2.2em;
    z-index: 5;
}
li {
    height: auto;
}
.nofound, a {
    color: #eee;
    font: normal normal 1em/150% "Inconsolata", monospace;
    text-decoration: none;
    display: block;
    padding: .3em .5em;
    border-bottom: 1px solid #444;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    width: 100%;
    transition: all ease .1s;
}
a:hover, a:focus, a:active {
    background: #eee;
    color: #222;
}
</style>
