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
        // determine initial Y offset of pre element + height for controls
        this.yoff = document.querySelector("pre").getBoundingClientRect().top + 60

    },
    mounted() {

        this.yoff = document.getElementsByTagName("pre")[0].getBoundingClientRect().y
    },
    created() {
        window.addEventListener("keyup", (e) => {
            if (e.which === 39) {
                this.increaseSpeed()
            } else if (e.which === 37) {
                this.decreaseSpeed()
            } else if (e.which === 17) {
                e.preventDefault()
                this.startScroll();
            } else if (e.which === 13 && document.querySelector("pre")) {
                this.scrollTop()
            }
        })
    },
    methods: {
        scroller() {
            console.log("scrollY: ", this.currY)
            this.step += this.scrollSpeed

            if (this.currY + window.innerHeight - this.yoff <=  document.querySelector("pre").clientHeight  && this.scrolling) {
                if (this.step >= 10) {
                    this.currY = window.pageYOffset + 1;
                    window.scroll(0, this.currY);
                    requestAnimationFrame(this.scroller)
                    this.step = 0;
                } else {
                    // console.log("step", this.step);
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
                this.scrolling = true;
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
            console.log("doc", this.$refs)
            console.log(Math.round(document.getElementsByTagName("pre")[0].getBoundingClientRect().y));
            window.scroll(0, document.getElementsByTagName("pre")[0].getBoundingClientRect().y - 80)
        }
    },

}
</script>

<style lang="css" scoped>
.scroll-cont {
    position: relative;
    left: 170px;
}
.scroller {
    display: flex;
    flex-flow: row;
    position: fixed;
    top: 90vh;
    /* left: 25%; */
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
    font: normal 1em/130% "Muli", sans-serif;
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
