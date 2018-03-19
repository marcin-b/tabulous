<template lang="html">

    <div class="scroll-cont">

        <div
            class="scroller"
            :class="{ positioner: isActive }">

            <button
            @click="startScroll"
            :class="{ scrolling: scrolling }"
            id="start-scroll">
            Scroll
            </button>

            <button @click="decreaseSpeed" type="button" id="dec">
            -
            </button>

            <!-- Speed Indicator -->
            <input
            type="number"
            v-model="scrollSpeed"
            step="1"
            min="1"
            max="10">

            <button @click="increaseSpeed" id="inc">
            +
            </button>

            <button @click="stopScroll" type="button" id="stop-scroll">
            Stop
            </button>

            <button @click="scrollTop($event)" type="button" id="scroll-top">
            Top
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
            scrollSpeed: 4,
            scrolling: false,
            step: 0,
        }

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
            } else if (e.which === 13) {
                if(document.getElementsByTagName("pre").length > 0) {
                    console.log("TAG:", Math.round(document.getElementsByTagName("pre")[0].getBoundingClientRect().y));
                    window.scroll(0, Math.round(document.getElementsByTagName("pre")[0].getBoundingClientRect().y) - 40)
                }
            }
        })
    },
    methods: {
        scroller() {
            // console.log("scrollY: ", this.currY, this.scrollSpeed, this.step);
            this.step += this.scrollSpeed

            if (this.currY + window.innerHeight <= document.body.scrollHeight && this.scrolling) {
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
        scrollTop(e) {
            window.scroll(0, e.path[2].offsetTop - 33)
            console.info(e.path[2].offsetTop)
            // window.scroll(0, 0; path[2].pageYOffset)
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
    position: fixed;
    top: 90vh;
    /* left: 25%; */
    z-index: 5;
}
/* Contol Buttons */
input, button {
    background: #222;
    color: #eee;
    border: 1px solid #eee;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, .7);

}
input {
    font: normal .95em/130% "Muli", sans-serif;
    text-align: center;
    padding-left: 1em;
    width: 3.3em;
}
button {
    cursor: pointer;
    font: normal 1em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: .5em;
    padding: 0 .5em;
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
