<template lang="html">
    <div class="welc-container">

            <img id="big-logo" src="/img/logo_300px.png" alt="Tabulous">


        <div class="intro-cont">
            <Intro/>

            <div class="flipper">
                <transition name="flip" mode="out-in">

                    <Reg
                    v-if="!registered"
                    key="reg"
                    @swap="swapper"/>

                    <Login
                    v-else
                    key="login"
                    @swap="swapper"/>

                </transition>
            </div>

        </div>

    </div>

</template>

<script>
import Intro from "~/components/Intro.vue"
import Login from "./login.vue"
import Reg from "./reg.vue"

export default {
    components: {
        Intro,
        Reg,
        Login
    },
    data() {
        return { registered: false }
    },
    methods: {
        swapper(val) {
            this.registered = val
        }
    },
    head() {
        return {
            title: "Welcome to Tabulous"
        }
    }
}
</script>

<style>
.welc-container {
    align-items: center;
    background: url(~/assets/img/imagebw.jpg);
    background-size: cover;
    background-position:0 0;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
}
.intro-cont {
    display: flex;
    flex-flow: row wrap-reverse;
    align-items: center;
    justify-content: center;
    margin: 0 .5em 2em;
}
.feat > h1 {
    background-color: rgba(0, 0, 0, .3);
    font-size: 1.6em;
}
.flipper {
    align-self: flex-end;
    display: flex;
    align-items: center;
    height: 380px;
    margin-bottom: 1em;
    perspective: 800px;
}
.form {
    align-items: center;
    border: 2px dashed darkorange;
    background-color: rgba(0, 0, 0, .5);
    color: #eee;
    display: flex;
    flex-direction: column;
    font: normal 1em/150% "Muli", sans-serif;
    margin: 0 2em;
    padding: .6em 1em 1em;
    z-index: 2;
}
.form > input {
    border: 1px solid #222;
    box-shadow: 1px 2px 3px rgba(0,0,0,.7);
    font: normal 1.2em/150% "Muli", sans-serif;
    padding-left: .5em;
    margin-bottom: 1em;
    height: 2em;
    width: 250px;
}
.form > button {
    background-color: darkorange;
    color: black;
    border: 1px solid darkorange;
    cursor: pointer;
    font: normal 400 1.5em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: 0 0 .8em;
    padding: 0 .8em;
    box-shadow: 1px 2px 3px rgba(0,0,0,.7);
    transition: transform ease .1s;
}
.form > button:hover {
    transform: scale(1.2, 1.2) ;
    color: white;
    background: rgba(0, 0, 0, .5);
}
.form > button:focus, .form > button:active {
    color: white;
    background: rgba(0, 0, 0, .5);
}
.swapper, #reseter {
    text-decoration: none;
    color: darkorange;
    cursor: pointer;
    font: normal bold 1em/150% "Muli", sans-serif;
    text-shadow: 1px 1px 0px #000;
}

/* Animation */
.flip-enter-active {
    transition: all .4s ease;
}
.flip-leave-active {
    transition: all .2s ease-out;
}
.flip-enter {
    transform-origin: left;
    transform: rotateY(95deg);
    opacity: 0;
}
.flip-leave-to {
    transform-origin: right;
    transform: rotateY(-95deg);
    opacity: 0;
}
</style>
