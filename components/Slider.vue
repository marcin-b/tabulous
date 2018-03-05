
<template lang="html">

    <div id="slider">

        <span @click="getVal($event)" v-model="speed" :value=".2">2</span>
        <span @click="getVal($event)" v-model="speed">4</span>
        <span @click="getVal($event)" v-model="speed">6</span>
        <span @click="getVal($event)" v-model="speed">8</span>
        <span @click="getVal($event)" v-model="speed">10</span>

    </div>

</template>

<script>

export default {
    name: "Slider",
    data() {
        return {
            speed: 0
        }
    },
    methods: {
        getVal(e) {
            // this.speed = e.target
            console.log("val:", this.speed);
        }
    }
}

</script>

<style lang="css">

#slider {
    background-color: #222;
    border: 1px solid #eee;
    box-shadow: 1px 2px 3px #222;
    display: flex;
    font-weight: 400;
    justify-content: center;
    width: auto;
}
#slider > span {
    padding: 0 .5em;

}
</style>
