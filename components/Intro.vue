
<template lang="html">

    <div class="feat">

        <h1>Your own Tab song<wbr>book.</h1>

        <p>Trying to remember songs you once learned is not always easy, especially if you're an old chunk of coal that knows hundreds of songs.<br/>
        You don't want to waste time when playing with friends, jamming out with colleagues or trying to impress that girl/boy you like.
        That's what Tabulous is for.
        </p>

        <ul>
            <li>&#x1F4D6 Collect chords / tabs / lyrics</li>
            <li>&#x1F44D Share your songbook</li>
            <li>&#x1F3B8 Play</li>
            <li>&#x1F601 Enjoy</li>
        </ul>

        <p>Finally there is a place for that and it's wicked fresh.<br>
        To save your personal songbook you need to sign up but you can browse the tab collection <transition mode="out-in"><nuxt-link to="/">here</nuxt-link></transition>.
        </p>

    </div>

</template>

<script>
export default {
}
</script>

<style lang="css">

.feat {
    font: normal 400 130% "Muli", sans-serif;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    justify-content: center;
}
.feat > ul {
    background-color: rgba(0, 0, 0, .3);
    padding: 1em 3.3em;
    width: 100%;
}
.feat > ul > li {
    color: #fff;
    background:;
    font: normal bold 1em/150% "Muli", sans-serif;
    letter-spacing: 1px;
    padding: .6em 0;
    text-shadow: 1px 2px 0px #000;
}
.feat > ul > li::first-letter {
    font-size: 1.5em;
    padding-right: .6em;
}
p {
    background: rgba(255, 255, 255, .8);
    color: #000;
    font: normal .88em/120% "Inconsolata", monospace;
    align-self: center;
    max-width: 580px;
    padding: 1em 2em;
    text-shadow: 0px 1px 1px #fff;
    white-space: pre-line;
}
p > a {
    color: darkorange;
    background: #222;
    padding: 0 .2em;
    text-decoration: none;
    text-shadow: 1px 1px 1px #000;
}
</style>
