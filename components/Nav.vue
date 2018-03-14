<template>
    <nav>
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
}
</script>

<style lang="css">
nav {
    background:url(~/assets/img/imagebw.jpg);
    background-size: cover;
    background-position: 0 calc((300px + 96px) * -1);
    background-color: rgba(255, 255, 255, .5);
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    margin-bottom: .5em;
    padding-bottom: .5em;
    text-align: center;
    width: 100%;
    z-index: 5;
}
nav > a {
    display: block;
    color: #eee;
    font-family: 'Lato';
    font-weight: bold;
    font-size: 1.7em;
    line-height: 120%;
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
    /* transform: translateY(-3px); */
}
</style>
