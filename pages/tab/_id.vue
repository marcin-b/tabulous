<template>
    <section>

        <my-header/>

        <Nav/>

        <nuxt-link @click.native="$router.back()" to="/profile/songbooks" id="back-to">
            <span class="accent"><-</span> Back
        </nuxt-link>

        <h2>{{tab.title}} - {{tab.artist}}</h2>

        <Scroller />

        <pre>{{tab.tab}}</pre>

    </section>
</template>

<script>
import axios from "~/plugins/axios"

import MyFooter from '~/components/Footer.vue'
import Scroller from '~/components/Scroller.vue'
import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'

export default {
    components: {
        MyHeader,
        Nav,
        Scroller,
        MyFooter,
    },
    data() {
        return {
            tab: {}
        }
    },
    asyncData(context) {
        return axios.get("/api/tab/" + context.params.id)
        .then(({data}) => {
            console.log("get TAB: ", data)
            return {
                tab: data
            }
            // this.tab = data

        })
        .catch(err => console.log("get Tab err: ", err))
    },
    head() {
        return { title: this.tab.title }
    },
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
pre {
    width: auto;
}
#back-to {
    outline: 5px dotted #444;
    color: #eee;
    display: block;
    font: normal normal 1em/150% "Inconsolata", monospace;
    text-decoration: none;
    padding: 0 1em;
    margin: 1em 0;
    transition: all ease .2s;
}
#back-to:hover, #back-to:active, #back-to:focus {
    outline: 5px dotted #FF8C00;
}

</style>
