<template>
    <section id="profile">
        <h1>Profile</h1>
        <h2>this is the retarded child of PROFILE</h2>
        <ul>

            and what the fuck is this shit?
            <li>dumb item 1</li>
            <li>dumb item 2</li>
            <li>NVM</li>
        </ul>

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

        }
    },
    methods: {

    },
    head() {
        return {
            title: this.$store.state.authUser.username
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


</style>
