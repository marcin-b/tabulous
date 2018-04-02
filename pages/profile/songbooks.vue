<template>
<section>

    <div
        v-if="$route.path === '/profile/songbooks'"
        class="col-cont">

        <h1>Your Songbooks</h1>

        <div class="persp">

            <transition
            mode="out-in"
            name="sf"
            >

                <button
                    v-if="!showInput"
                    @click="toggleAdder"
                    key="add"
                    id="add-sb">
                    Create new Songbook
                </button>

                <form
                    v-else
                    key="form"
                    @submit.prevent="submitNewSb()"
                    class="">

                    <div class="col-cont">
                        <label>Give it a name</label>

                        <div class="">
                            <input
                            autofocus
                            v-model="newSongbook.name"
                            type="text"
                            placeholder="My Songbook"
                            ref="name"
                            />

                            <button key="sub" type="submit">+</button>
                        </div>

                    </div>

                </form>

            </transition>

        </div>
    </div>

    <nuxt-child
        :addedSongbook="addedSongbook" />

</section>
</template>
<script>
import axios from "~/plugins/axios"
export default {
    transition: {
        name: "page",
        mode: "out-in"

    },
    data() {
        return {
            showInput: false,
            addedSongbook: {},
            newSongbook: {
                ownerId: this.$store.state.authUser.id,
            }
        }
    },
    methods: {
        submitNewSb() {
            console.log("SB", this.newSongbook);
            axios.post("/api/create-songbook", this.newSongbook)
            .then(({data}) => {
                this.addedSongbook = data.newSongbook
                console.log("resp:", data);
            })
            .catch(err => console.log("add sb error:", err))
            this.toggleAdder()
        },
        toggleAdder() {
            this.showInput = !this.showInput
            console.log("refs: ", this.$refs);

        }
    },

}
</script>

<style scoped>
section {
    /* margin-top: 1em; */
}
.persp {
    perspective: 400px;
}
button {
    border: 1px solid darkorange;
    color: black;
    background: darkorange;
    font: normal normal 1.1em/180% "Muli", sans-serif;
    margin-bottom: 1em;
    padding: 0 0.8em;
    transition: transform ease .1s;
    z-index: 1;
}
button:hover {
    transform: scale(1.1, 1.1);
}
input {
    border: 1px solid black;
    font: normal normal 1.1em/180% "Muli", sans-serif;
    width: 250px;
    margin: 0 .2em;
    padding: 0 .5em;
    z-index: 0;
}
div.col-cont {
    position: relative;
}
div.col-cont > label {
    position: absolute;
    top: -1.2em;
    left: 1em;
}

/* transitions */

.sf-enter-active, :hover.sf-enter-active {
    /* transform-origin: left; */
    transition: all .2s ease-out;
}
.sf-leave-active, :hover.sf-leave-active {
    /* transform-origin: right; */
    transition: all .2s ease-in;
}
.sf-enter, :hover.sf-enter {

    transform: rotateY(90deg) ;
    opacity: 0;
}
.sf-leave-to, :hover.sf-leave-to {
    transform: rotateY(-90deg);
    opacity:0;
}
</style>
