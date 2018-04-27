<template>
    <section>

        <my-header/>

        <Nav/>

        <h1>About</h1>

        <p>
            Tabulous emerged as my final project at SPICED Academy. Other than learning to build web apps I found a cool bunch of people who I jam with and we encountered the problem of coming up with songs to play. <br>
            We learn so many songs that sometimes it's hard to remember all of them and looking for good tabs or chords can be annoying sometimes because there are so many inacurate ones.<br>
            So I came up with the idea for Tabulous. Save good tabs if you find them. They will be available for all users of Tabulous so they too can save the best tabs to their songbooks and have them ready when playing or jamming.<br>
            I will be adding features in the future and I hope people will find a use for this as I do. I don't want your data so I kept the registration and profile reqirements to a minimum.<br>
            Enjoy!

        </p>

    </section>
</template>

<script>

import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'

export default {
    components: {
        MyHeader,
        Nav,
    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
p {
    box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 1);
    background: #eee;
    color: #000;
    font: normal 1.1em/120% "Inconsolata", monospace;
    align-self: center;
    max-width: 580px;
    padding: 1em 2em;
    text-shadow: 0px 1px 1px #fff;
    white-space: pre-line;
}
img {
    border-radius: 10px;
    margin-top: 1em;
    box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 1);
}

</style>
