<template lang="html">
    <div class="welc-container">

        <div class="intro-cont">

            <span id="big-logo">Tabulous</span>

            <Intro/>
        </div>

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
        return {
            registered: false,

        }
    },
    methods: {
        swapper(val) {
            console.log("THE VAL", val);
            this.registered = val
        }
    }
}
</script>



<style lang="css">
.welc-container {
    background: url(~/assets/img/imagebw.jpg);
    background-size: cover;
    background-position: 0 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.intro-cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}
#big-logo {
    align-self: center;
    background: rgba(0, 0, 0, .5);
    color: darkorange;
    display: block;
    font-family: "Rock Salt", script;
    font-size: 4.5em;
    font-weight: 400;
    line-height: 200%;
    text-align: center;
    text-shadow: 1px 5px 0px #222;
    width: 80vw;
    max-width: 666px;
}
h1 {
    color: #eee;
    display: inline-block;
    font: normal bold 2em/150% "Muli", sans-serif;
    letter-spacing: 1px;
    margin: 1em 0 0;
}
.swapper {
    color: #0cf;
    color: darkorange;
    cursor: pointer;
    font: normal .8em/150% "Muli", sans-serif;

}
.form {
    align-items: center;
    border: 2px dashed darkorange;
    background-color: rgba(0, 0, 0, .5);
    color: #eee;
    display: flex;
    flex-direction: column;
    font: normal 1em/150% "Muli", sans-serif;
    margin: .8em 0 1em;
    padding: 1em;
    z-index: 2;
}
.form > input {
    border: 1px solid black;
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
    margin: .5em;
    padding: 0 .5em;
    box-shadow: 1px 2px 3px #000;
}
/* Animation */
.flipper {
    margin-left: 4em;
    perspective: 800px;
}
.flip-enter-active {
    transition: all .4s ease;
}

.flip-leave-active {
    transition: all .2s ease-out;
}

.flip-enter  {
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
