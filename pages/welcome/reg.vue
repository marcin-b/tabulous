<template lang="html">

    <div class="">

        <h1>Sign Up</h1>

        <div class="form">
            <input type="text" name="" value="" placeholder="username">
            <input type="text" name="" value="" placeholder="email@example.com">
            <input type="password" name="" value="" placeholder="Password">
            <button type="submit" name="button">Submit</button>
        </div>

        <span
            @click="swapRegLog"
            class="swapper">
            Log in
        </span>
    </div>

</template>

<script>

export default {
    transition: {
        name: "fade",
        mode: "out-in",
    },
    methods: {
        swapRegLog() {
            this.$emit("swap", true)

        }
    }
}

</script>

<style lang="css">



</style>
