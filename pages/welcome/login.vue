<template lang="html">

    <form @submit.prevent="submitLog" class="form">

        <h2>Login</h2>

        <input
            ref="email"
            v-model="user.email"
            type="email"
            placeholder="email"
            required
            autofocus />
        <input
            v-model="user.password"
            type="password"
            placeholder="password"
            required />

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

// this.$refs.email.focus()

export default {
    name: "Login",
    data () {
        return {
            user: {
                // email: null,
                // password: null
            },
            error: false,
            errorMsg: "",
        }
    },
    methods: {
        swapRegLog() {
            this.$emit("swap", false)
            console.log("ref",this.$refs.email);
        },
        submitLog() {
            // Credential check for lack of Support of "required"
            if (!this.user.email) {
                this.error = true
                this.errorMsg = "Please enter an email."
            } else if (!this.user.password) {
                this.error = true
                this.errorMsg = "Please enter a password."
            } else {
                this.$store.dispatch("login", { user: this.user })
                .then(resp => this.$router.replace("/"))
                .catch(e => {
                    this.error = e.error
                    this.errorMsg = e.message
                    console.log("login NIE udany", e.message)
                })
            }
        }
    },
    mounted() {
        this.$refs.email.focus()
    }
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
