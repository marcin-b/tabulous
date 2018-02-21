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
    display: flex;
    flex-wrap: wrap;
    background-color: #222;
    text-align: center;
    justify-content: center;
}
nav > a {
    color: #eee;
    font-family: 'Lato';
    font-weight: bold;
    font-size: 1.5em;
    text-decoration: none;
    letter-spacing: .3em;
    transition: transform ease-out .1s;
}
nav > a:hover {
    color: darkorange;
    text-shadow: 1px 2px 3px #000;
    transform: translateY(-2px);
}
</style>
