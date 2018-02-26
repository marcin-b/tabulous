<template lang="html">

    <li>
        <a @click="toggleTab"
        :class="{ activeclass: isActive}">{{ tab.title }} - {{ tab.artist }}</a>
        <span v-if="tab.haslyrics == 'true'">has lyrics</span>
        <transition name="slide" >
            <pre v-show="isActive">{{ tab.tab }}</pre>
        </transition>
    </li>

</template>

<script>
import axios from '~/plugins/axios'

export default {
    name: "Tab",
    props: [ "tab" ],
    data () {
        return {
            isActive: false
        }
    },
    methods: {
        toggleTab() {
            this.isActive = !this.isActive
        }
    }
}
</script>

<style lang="css">
pre {
    background-color: #ddd;
    border: 1px solid darkorange;
    color: #222;
    font: normal .9em "Inconsolata", monospace;
    /* margin-left: -25px; */
    padding: .8em;
    position: absolute;
    width: 700px;
    white-space: pre-wrap;
}
/* Animations */
.slide-enter-active, .slide-leave-active {
    transition: all ease .5s;
}

/* .slide-fade-leave-active below version 2.1.8 */
.slide-enter
{
    /* transform: translateX(-100vw); */
    transform: translateX(100vw);
    /* opacity: 0; */
}
.slide-leave-to {
    /* transform: translateX(-100vw); */
    transform: translateX(-100vw);
    /* opacity: 0; */
}
.activeclass {
    color: darkorange;
    text-shadow: 1px 2px 3px #000;
}
</style>
