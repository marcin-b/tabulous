<template>
    <section id="profile">

        <h1>Profile</h1>
        
        <img :src="user.img" :alt="user.username" />
        <ul>
            <li>dumb</li>
            <li>list</li>
            <li>items</li>
        </ul>

        <nuxt-child/>
    </section>
</template>

<script>

export default {
    components: {

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
img {
    width: 200px;
    height: 200px;
    border-radius: 10%;
    border: 2px dashed darkorange;
    filter: drop-shadow( 0px 2px 3px #000);
    box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, .3);
    padding: 1em;
    margin: 2em 0;
}
ul {
    font: 1.5em/150% "Muli", sans-serif;
}

</style>
