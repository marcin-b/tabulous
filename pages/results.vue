<template>
    <section>

        <my-header/>

        <Nav/>

        <h1>Results</h1>

        <ul>

            <li v-if="results && results.length === 0" class="nofound">No results :(</li>

            <li
            v-for="(result, index) in results">
            <nuxt-link :to="`/tab/${result.id}`">
                {{result.title}} - {{result.artist}}
            </nuxt-link>

            <span>
                <span class="accent">{{ result.type }}</span>

                <span v-if="result.haslyrics">
                    |
                    <span class="accent">lyrics</span>
                </span>

            </span>

            </li>

        </ul>

    </section>
</template>

<script>
import axios from "~/plugins/axios"

import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'

export default {
    components: {
        MyHeader,
        Nav,
    },
    data() {
        return {
            results: [],
        }
    },
    asyncData(context) {
        return axios.get("/api/tab-search?search=" + context.route.query.search)
        .then(({data}) => {
            console.log(data);
            return {
                results: data
            }
        })
    }
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
ul {
    margin-bottom: 2em;
}
li {
    border-bottom: 1px dashed #444;
    position: relative;
    padding-right: 2em;
}

li > a {
    color: #eee;
    display: inline-block;
    font: normal 400 1.4em/150% "Lato", sans-serif;
    position: relative;
    text-decoration: none;
    letter-spacing: .03em;
    margin: 0;
    padding-right: 3.3em;
    transition: transform ease .1s;
    transform-origin: left;
    transform: scale(.9, .9);
    text-shadow: none;
}
li > a:hover {
    text-shadow: 1px 2px 2px #000;
    text-decoration: underline darkorange;
    transform: scale(1, 1);
}
li > span {
    font: normal  400 .7em/200% "Lato", sans-serif;
    align-self: flex-end;
    padding-bottom: 2px;
    position: absolute;
    right: 2em;
    bottom: 0;
    z-index: 1;
}

</style>
