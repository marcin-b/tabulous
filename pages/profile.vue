<template>

    <section>

        <my-header/>

        <Nav/>

        <nuxt-child/>

    </section>

</template>

<script>

import axios from '~/plugins/axios'
import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'

export default {
    middleware: "auth",
    components: {
        MyHeader,
        Nav,
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
