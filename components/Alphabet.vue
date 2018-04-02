<template>

    <nav :class="{ notlogged: !$store.state.authUser }">
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

</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<style>
nav {
    background:url(~/assets/img/imagebw.jpg);
    background-size: cover;
    background-position: 0 calc((50px + 86px) * -1);

    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    padding: .3em 0;
    text-align: center;
    width: 100%;
    z-index: 5;
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
nav > a:hover, nav > a:active, nav > a:focus {
    background-color: rgba(0, 0, 0, .8);
    color: darkorange;
    transform: scale(1.35, 1.35);
    text-shadow: 0px 2px 1px #000;

}
.notlogged {
    background-position: 0 calc((50px + 60px) * -1);
}
</style>
