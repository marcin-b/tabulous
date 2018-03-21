<template>
    <section>

        <my-header/>

        <Nav/>
        <nuxt-child/>

    </section>
</template>

<script>

import axios from '~/plugins/axios'
import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'

export default {
    components: {
        MyHeader,
        Nav,
        MyFooter
    },
    data() {
        return {
            user: this.$store.state.authUser
        }
    },
    methods: {

    },
    head() {
        return {

        }
    },
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
section > h1 {
    background: none;
    font-size: 2em;
}


</style>
