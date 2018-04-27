<template>
    <section>

        <my-header/>

        <Nav/>

        <Alphabet />

        <button v-if="!show && $store.state.authUser" @click="show = !show" id="addtab">
            Add new Tab
        </button>

        <button v-else-if="show" @click="show = !show" id="addtab">
            Close
        </button>

        <transition name="slide-fade">
            <Tabform
            v-if="show"
            @tabadded="updateTabs"
            @hide="hideForm"
            :tabformShown="this.show" />
        </transition>

        <Tabs :update="performUpdate"/>

    </section>
</template>

<script>

import axios from '~/plugins/axios'

import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'
import Alphabet from '~/components/Alphabet.vue'
import Tabform from '~/components/Tabform.vue'
import Tabs from '~/components/Tabs.vue'

export default {
    components: {
        Alphabet,
        MyHeader,
        Nav,
        Tabform,
        Tabs,
        MyFooter
    },
    data() {
        return {
            performUpdate: false,
            show: false,
            tabFormShown: false,
            sortedTabs: [{}]
        }
    },
    methods: {
        hideForm() {
            this.show = false;
        },
        updateTabs() {
            this.performUpdate = true
        },
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
    color: #eee;
    border: 1px solid darkorange;
    cursor: pointer;
    display: inline-block;
    font: normal 1.4em/150% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em 0 .5em;
    padding: 0 1em;
    position: relative;
    box-shadow: 1px 2px 3px #000;
    transition: transform ease .1s;
}
#addtab:hover {
    transform: scale(1.1, 1.1);
    border: 1px solid darkorange;
    background-color: darkorange;
    color: #000;
}

</style>
