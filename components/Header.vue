<template>
    <header>
        <span id="logo">Tabulous</span>

        <Search />

        <div class="">

            <nuxt-link
                v-if="!$store.state.authUser"
                to="/welcome">
                Login / Sign up
            </nuxt-link>

            <span v-else @click="logout">Logout</span>

        </div>

    </header>
</template>

<script>
import Search from "~/components/Search.vue"

export default {
    components: { Search },
    data() {
        return {

        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout")
        }
    }
}

</script>

<style scoped>
header {
    align-items: center;
    background:url(~/assets/img/imagebw.jpg);
    background-size: cover;
    background-position:0 -50px;
    color: darkorange;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0;
    padding: 0 1em;
    width: 100%;
    z-index: 5;
}
header > * {
    z-index: 5;
}

div > a, div > span {
    color: #eee;
    cursor: pointer;
    /* text-decoration: underline darkorange; */
    text-decoration: none;
    font: normal 400 1.2em/130% "Lato", sans-serif;
    text-shadow: 1px 1px 0px #000;
}
div > a:hover, div > span:hover {
    text-decoration: underline darkorange;
}
</style>
