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
            console.log("Logged out!");
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
.search {
    display: flex;
    align-items: center;
}
header input {
    font-family: Muli;
    /* border: 1px solid; */
    border: 0;
    font-size: 1.2em;
    line-height: 100%;
    height: 1.8em;
    width: 180px;
    padding: 0 0 0 .5em;
}
input:focus {
    border: 0;
}
header button {
    background-color: transparent;
    border: 1px solid #eee;
    cursor: pointer;
    height: 2.6em;
    margin: 0 .3em;
    padding: .2em .3em;
    width: 2.7em;
}
header button:hover {
    background-color: rgba(0, 0, 0, .5);

}
header button img {
    align-self: center;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg)
}

</style>
