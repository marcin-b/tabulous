<template lang="html">

    <div class="scroll-cont">

        <div
            class="scroller"
            :class="{ positioner: isActive }">


            <button
            @click="startScroll"
            :class="{ scrolling: scrolling }"
            id="start-scroll">
            Scroll<span>CTRL (toggle)</span>
            </button>


            <button @click="decreaseSpeed" type="button" id="dec">
            -<span>left arrow</span>
            </button>

            <!-- Speed Indicator -->
            <div id="speed-cont">
                <span>Speed</span>
                <input
                type="number"
                v-model="scrollSpeed"
                step="1"
                min="1"
                max="10">
            </div>

            <button @click="increaseSpeed" id="inc">
            +<span>right arrow</span>
            </button>

            <button @click="scrollTop()" type="button" id="scroll-top">
            Top<span>Enter</span>
            </button><br>

        </div>
    </div>


</template>

<script>


export default {
    name: "Scroller",
    props: [ "isActive" ],
    data () {
        return {
            currY: 0,
            yoff: 0,
            scrollSpeed: 4,
            scrolling: false,
            step: 0,
        }

    },
    mounted() {
        this.yoff = document.querySelector("pre").getBoundingClientRect().y

        window.addEventListener("keyup", (e) => {
            e.preventDefault()
            e.stopPropagation()
            // left
            if (e.which === 39) {
                this.increaseSpeed()
            // right
            } else if (e.which === 37) {
                this.decreaseSpeed()
            // CTRL/CMD
            } else if (e.which === 17) {
                this.startScroll();
            // enter
            } else if (e.which === 13 && document.querySelector("pre")) {
                this.scrollTop()
            // escape
            } else if (e.which === 27) {
                this.$emit("closetab")
            }
        })
    },
    methods: {
        scroller() {
            this.step += this.scrollSpeed

            // 60 compensates the bottom margin of <pre/>
            if (this.currY - 100 <=  (document.querySelector("pre").clientHeight + this.yoff - window.innerHeight)  && this.scrolling) {
                if (this.step >= 10) {
                    this.currY = window.pageYOffset + 1;
                    window.scroll(0, this.currY);
                    requestAnimationFrame(this.scroller)
                    this.step = 0;
                } else {
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
            if (!this.scrolling && document.querySelector("pre")) {
                this.scrolling = !this.scrolling;
                requestAnimationFrame(this.scroller)
            } else {
                this.scrolling = false;
            }
        },
        stopScroll() {
            this.scrolling = false;
        },
        increaseSpeed() {
            if (this.scrollSpeed < 10) {
                this.scrollSpeed += 1
            }
        },
        decreaseSpeed() {
            if (this.scrollSpeed > 1) {
                this.scrollSpeed -= 1
            }
        },
        scrollTop() {
            this.yoff = document.querySelector("pre").getBoundingClientRect().y
            // console.log("TESTING", Math.round(document.querySelector("pre").scrollHeight));
            window.scroll(0, this.yoff - 80)
        }
    },

}
</script>

<style lang="css" scoped>
.scroll-cont {

    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
}
.scroller {
    display: flex;
    flex-flow: row;
    position: fixed;
    bottom: 2em;
    z-index: 5;
}

/* Contol Buttons */
button, #speed-cont {
    color: #eee;
    background: #222;
    border: 1px solid #eee;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, .7);
    display: flex;
    flex-flow: column;
    align-items: center;
    cursor: pointer;
    font: normal 1.2em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em;
    padding: 0 .5em;
    transition: transform ease-out .1s;
}
input {
    background: #222;
    border: 0;
    color: #eee;
    font: normal .95em/130% "Muli", sans-serif;
    text-align: center;
    padding-left: 1em;
    width: 3.3em;
}
button:hover {
    transform: scale(1.4, 1.4);
    color: darkorange;
}
button > span {
    font-size: .5em;
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
