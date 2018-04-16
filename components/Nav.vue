<template>

    <div class="nav-cont">
        <div v-if="$store.state.authUser" class="user-nav">

            <span>Hi {{$store.state.authUser.username}} &#x1F918</span>

            <nuxt-link :to="'/'">
                Home
            </nuxt-link>

            <nuxt-link :to="'/profile'">
                Profile
            </nuxt-link>

            <nuxt-link :to="'/profile/songbooks'">
                My Songbooks
            </nuxt-link>

            <nuxt-link :to="'/about'">
                About
            </nuxt-link>

        </div>


    </div>

</template>

<script>
export default {
    data() {
        return {
            test: false,
        }
    }
}
</script>

<style scoped>
.nav-cont {
    width: 100%;
    background:url(~/assets/img/imagebw.jpg);
    background-size: cover;
    background-position: 0 calc((50px + 64px) * -1);
}
.user-nav {
    background: rgba(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    font: normal 400 1em/130% "Lato", sans-serif;

}
span {
    text-shadow: 1px 1px 0px #000;
    padding-right: 1em;
}
.user-nav > a {
    color: #eee;
    cursor: pointer;
    text-decoration: none;
    padding: .1em 1em;
    text-shadow: 1px 1px 0px #000;
}
.user-nav > a:hover, .user-nav > a:active, .user-nav > a:focus {
    text-decoration: underline darkorange;
    background: rgba(0, 0, 0, .7);
}
</style>
