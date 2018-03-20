<template lang="html">

    <form @submit.prevent="submitLog" class="form">

        <h2>Login</h2>

        <input
            v-model="user.email"
            type="email"
            placeholder="email" />
        <input
            v-model="user.password"
            type="password"
            placeholder="password">

        <button type="submit" name="button">Login</button>

        If you are not registered
        <span
            @click="swapRegLog"
            class="swapper">
            Sign Up
        </span>

        <span v-if="error" class="error">{{errorMsg}}</span>

    </form>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    name: "Login",
    data () {
        return {
            user: {},
            error: false,
            errorMsg: "",
        }
    },
    methods: {
        swapRegLog() {
            this.$emit("swap", false)
        },
        submitLog() {

            this.$store.dispatch("login", { user: this.user })
            .then(resp => this.$router.replace("/"))
            .catch(e => {
                this.error = e.error
                this.errorMsg = e.message
                console.log("login NIE udany", e.message)
            })
        }
    },
}
</script>

<style lang="css">
input + .err-indicator {
    border: 1px solid red;
}
.error {
    font-size: 1em;
    border: 1px solid red;
    padding: 0 .5em;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    width: 250px;
}
</style>
