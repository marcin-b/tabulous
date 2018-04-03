<template>

    <section class="col-cont">

        <span id="big-logo">Tabulous</span>

        <h1>{{ error.statusCode }}</h1>

        <h2 class="info">{{ error.message }}</h2>

        <nuxt-link class="button" to="/welcome" v-if="error.statusCode === 401">
            Login / Sign Up
        </nuxt-link>
        <nuxt-link class="button" to="/" v-else>
            Homepage
        </nuxt-link>

    </section>

</template>
<script>
export default {
    props: ['error']
}
</script>

<style scoped>

.info {
    font-weight: 300;
    color: #eee;
    margin: 0;
}
.button {
    background: #eee;
    color: #222;
    margin-top: 50px;
    font: normal 1.6em/150% "Muli", sans-serif;
    padding: .3em 1.5em;
    text-decoration: none;
}
.button:hover, .button:focus, .button:active {
    background: #222;
    border: 2px dashed darkorange;
    color: #eee;
}
</style>
