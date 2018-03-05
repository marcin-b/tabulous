<template lang="html">

    <div
    v-show="isActive"
    class="scroller"
    :class="{ positioner: isActive }">

        <button
            @click="startScroll"
            :class="{ scrolling: scrolling }"
            type="button"
            id="start-scroll">
            Scroll
        </button>


        <button @click="increaseSpeed" type="button" id="inc">
            +
        </button>
        <button @click="decreaseSpeed" type="button" id="dec">
            -
        </button>

        <button @click="stopScroll" type="button" id="stop-scroll">
            Stop
        </button>
    </div>

</template>

<script>

export default {
    name: "Scroller",
    props: [ "isActive" ],
    data () {
        return {
            currY: 0,
            scrollSpeed: .6,
            scrolling: false,
            step: 0,
        }

    },

    methods: {
        scroller() {
            console.log("scrollY: ", this.currY, this.scrollSpeed, this.step);
            this.step += this.scrollSpeed

            if (this.currY + window.innerHeight <= document.body.scrollHeight && this.scrolling){
                if (this.step >= 1) {
                    this.currY = window.pageYOffset + 1;
                    window.scroll(0, this.currY);
                    requestAnimationFrame(this.scroller)
                    this.step = 0;
                } else {
                    // this.step += this.scrollSpeed;
                    console.log("step", this.step);
                    requestAnimationFrame(this.scroller)
                }
            } else {
                this.scrolling = false;
                this.step = 0;
                this.currY = 0;
                return;
            }
        },
        startScroll() {
            this.scrolling = true;
            requestAnimationFrame(this.scroller)
        },
        stopScroll() {
            this.scrolling = false;
        },
        increaseSpeed() {
            if (this.scrollSpeed < 1) {
                this.scrollSpeed += .2
            }
        },
        decreaseSpeed() {
            if (this.scrollSpeed >= .2) {
                this.scrollSpeed -= .2
            }
        }
    },

}
</script>

<style lang="css" scoped>
.positioner {
    /* position: relative;
    top: -100%; */
}
.scroller {
    position: fixed;
    bottom: 1em;
    left: 50%;
    z-index: 5;
}
/* Contol Buttons */

button {
    background-color: #222;
    color: #eee;
    border: 1px solid #eee;
    cursor: pointer;
    font: normal 1em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em;
    padding: 0 .5em;
    box-shadow: 1px 2px 3px #222;
    transition: transform ease-out .1s;
}

button:hover {
    transform: scale(1.4, 1.4);
    color: darkorange;
}
#start-scroll:hover {
    /* color: #000; */
}
.scrolling {
    background-color: darkorange;
    font-weight: bold;
    color: #000;
}
.scrolling:hover {
    color: #000;
}
</style>
