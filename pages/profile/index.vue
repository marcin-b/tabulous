<template>
    <section id="profile">

        <h1>Profile</h1>
        <img :src="user.img" alt="" />
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
    border-radius: 50%;
    filter: drop-shadow(2px 5px 5px #000);
    margin: 2em 0;
}
ul {
    font: 1.5em/150% "Muli", sans-serif;
}

</style>
