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
            <Tabform v-show="show" />
        </transition>
        <Tabs/>

        <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
        <h1 class="title">
            USERS
        </h1>

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
            tabFormShown: false
        }
    },
    methods: {

            toggleTabForm() {
                if(!this.tabFormShown) {
                     this.tabFormShown = true
                     console.log("shown?", this.tabFormShown);
                } else {
                     this.tabFormShown = false
                }
            }


    },
    // async asyncData() {
    //     let { data } = await axios.get('/api/users')
    //     return { users: data }
    // },
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
    border: 1px solid #ccc;
    cursor: pointer;
    display: inline-block;
    font: bold 1.6em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: 1em 0;
    padding: 0 .5em;
    height: 1.6em;
    position: relative;
}
#addtab:hover {
    /* text-shadow: none; */
    border: 1px solid darkorange;
    background-color: darkorange;
    color: #222;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active, .slide-fade-leave-active {
    transition: transform ease-out .6s, bottom linear 2s;
}
/* .slide-fade-leave-active {
    transition: transform 2s ease-out;
    transition: height 1s ease-out 1s;
} */
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(-100vw);
}
.slide-fade-leave-to {
    transform: translatex(100vw);
}
</style>
