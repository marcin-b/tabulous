<template>
    <section>
        <Nav/>
        <button v-if="!show" @click="show = !show" id="addtab">
            Add new Tab
        </button>
        <button v-else="show" @click="show = !show" id="addtab">
            Close
        </button>
        <transition name="slide-fade">
            <Tabform v-show="show" :tabformShown="this.show" />
        </transition>
        <Tabs/>

    </section>
</template>

<script>

import axios from '~/plugins/axios'
import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'
import Tabform from '~/components/Tabform.vue'
import Tabs from '~/components/Tabs.vue'

export default {
    components: {
        MyHeader,
        Nav,
        Tabform,
        Tabs,
        MyFooter
    },
    data() {
        return {
            show: false,
            tabFormShown: false,
            sortedTabs: [{}]
        }
    },
    methods: {
    },
    head() {
        return {
            title: 'Tabulous'
        }
    },
}
</script>

<style>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#addtab {
    background-color: #222;
    color: darkorange;
    border: 1px solid #eee;
    cursor: pointer;
    display: inline-block;
    font: normal 1.6em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em 0 1em;
    padding: 0 .5em;
    height: 1.6em;
    position: relative;
    box-shadow: 1px 2px 3px #000;
}
#addtab:hover {
    /* text-shadow: none; */
    border: 1px solid darkorange;
    background-color: darkorange;
    color: #000;
}

</style>
