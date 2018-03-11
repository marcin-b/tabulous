
<template lang="html">
    <!-- <div class="intro-cont"> -->

        <p>
        When you play music with friends, jam out with colleagues or try to impress that girl/boy you like.
        Trying to remember songs you once learned is not always easy, especially if you are an old chunk of coal that knows hundreds of songs.<br/>
        That's what Tabulous is for.<br/>
        Collect tabs, chords and lyrics for your favorite songs in one place that coincidentally is fresh to death and fun to use.<br>
        To save your personal songbook you need to sign up but you can browse the tab collection <transition mode="out-in"><nuxt-link mode="out-" to="/">here</nuxt-link></transition>.

        </p>
    <!-- </div> -->
</template>

<script>
export default {
}
</script>

<style lang="css">

p {
    align-self: center;
    background: rgba(255, 255, 255, .7);
    color: #222;
    font: normal 400 1.1em/130% "Lato", sans-serif;
    letter-spacing: 1px;
    max-width: 666px;
    padding: 0 1.5em;
    text-shadow: 0px 1px 1px #fff;
    text-rendering: optimizeLegibility;
    white-space: pre-line;
    width: 80vw;
},
p > a {
    color: #eee;
    background: #222;
    /* text-decoration: underline wavy darkorange; */
    padding: 0 .2em;
    text-decoration: none;
    text-shadow: 1px 1px 1px #000;
}

</style>
