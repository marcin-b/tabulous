<template>

    <div class="nav-cont">
        <div v-if="$store.state.authUser" class="user-nav">
            <nuxt-link :to="'/profile'">
                Profile
            </nuxt-link>
            <nuxt-link :to="'/profile/songbooks'">
                My Songbooks
            </nuxt-link>
        </div>
        <nav v-if="$route.path != '/profile/songbooks' && $route.path != '/profile'">
            <a href="#A">A</a>
            <a href="#B">B</a>
            <a href="#C">C</a>
            <a href="#D">D</a>
            <a href="#E">E</a>
            <a href="#F">F</a>
            <a href="#G">G</a>
            <a href="#H">H</a>
            <a href="#I">I</a>
            <a href="#J">J</a>
            <a href="#K">K</a>
            <a href="#L">L</a>
            <a href="#M">M</a>
            <a href="#N">N</a>
            <a href="#O">O</a>
            <a href="#P">P</a>
            <a href="#Q">Q</a>
            <a href="#R">R</a>
            <a href="#S">S</a>
            <a href="#T">T</a>
            <a href="#U">U</a>
            <a href="#V">V</a>
            <a href="#W">W</a>
            <a href="#X">X</a>
            <a href="#Y">Y</a>
            <a href="#Z">Z</a>
        </nav>
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

<style lang="css">
.nav-cont {
    width: 100%;
    background:url(~/assets/img/imagebw.jpg);
    background-size: cover;
    background-position: 0 calc((50px + 60px) * -1);
    background-color: rgba(255, 255, 255, .5);
}
nav {
    background: rgba(0, 0, 0, .2);
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    padding: .3em 0;
    text-align: center;
    width: 100%;
    z-index: 5;
    /* border-bottom: 1px dashed white; */
}
nav > a {
    display: block;
    color: #eee;
    font: normal bold 1.6em/120% "Lato", sans-serif;
    text-decoration: none;
    padding: 0 .25em;
    transition: transform ease-out .1s;
    text-shadow: 1px 2px 0px #000;
}
nav > a:hover {
    background-color: rgba(0, 0, 0, .8);
    color: darkorange;
    transform: scale(1.5, 1.5);
    text-shadow: 0px 2px 1px #000;

}
.user-nav {
    background: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    /* padding: .1em 0; */
}
.user-nav > a {
    color: #eee;
    cursor: pointer;
    text-decoration: none;
    text-decoration: underline darkorange;
    font: normal 400 1.2em/130% "Lato", sans-serif;
    padding: .1em 1em;
    text-shadow: 1px 1px 0px #000;
}
</style>
