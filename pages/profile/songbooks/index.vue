<template lang="html">

    <section>


        <div class="">
            <transition
                mode="out-in"
                name="slide-fade"
                >

                    <button
                    v-if="!showInput"
                    @click="toggleAdder"
                    key="button"
                    type="submit"
                    id="add-sb">
                    Create new Songbook
                    </button>

                <form
                    v-else
                    key="form"
                    @submit.prevent="toggleAdder"
                    class="">

                    <input
                    type="text"
                    placeholder="My Songbook" />

                    <button type="submit">+</button>

                </form>
            </transition>

        </div>
            <ul>
                <li>one</li>
                <li>two</li>
                <li>three</li>
            </ul>

    </section>

</template>

<script>
export default {
    data() {
        return {
            showInput: false,

        }
    },
    asyncData(context) {
        return {

        }
    },
    methods: {
        toggleAdder() {
            this.showInput = !this.showInput
        }
    }
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
button {
    border: 1px solid darkorange;
    color: black;
    background: darkorange;
    font: normal normal 1.3em/150% "Muli", sans-serif;
    padding: 0.1em 1em;
    transition: transform ease .1s;
    z-index: 1
}
button:hover {
    transform: scale(1.1, 1.1);
}
input {
    border: 1px solid black;
    font: normal normal 1.2em/180% "Muli", sans-serif;
    width: 250px;
    margin: 0 .2em;
    padding: 0 .5em;
    z-index: -1;
}
.slide-fade-enter-active {
    transition: all .2s ease;
}
.slide-fade-leave-active {
    transition: all .2s ease-out;
}
.slide-fade-enter {
    transform: translateY(-50px);
    opacity: 0;
}
.slide-fade-leave-to {
    transform: translateY(-50px);
}
</style>
