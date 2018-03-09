<template lang="html">

    <div class="">

        <h1>Login</h1>



        <div class="form">
            <input type="text" name="" placeholder="Username">
            <input type="password" name="" placeholder="password">
            <button type="button" name="button">Login</button>
        </div>

        <span
            @click="swapRegLog"
            class="swapper">
            Registration
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
            this.$emit("swap", false)

        }
    }

}
</script>

<style lang="css">
a {
    color: #eee;
}


</style>
