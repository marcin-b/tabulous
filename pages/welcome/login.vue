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

        <div class="seper">
            If you are not registered<br>
            <span
                @click="swapRegLog"
                class="swapper">
                Sign Up
            </span>

        </div>

        <!-- 
        Forgot your Password?
        <nuxt-link
            id="reseter"
            to="/forgotten">
            reset it
        </nuxt-link> -->


        <span v-if="error" class="error">{{errorMsg}}</span>

    </form>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    name: "Login",
    data() {
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
            // Credential check for lack of Support of "required"
            if (!this.user.email) {
                this.error = true
                this.errorMsg = "Please enter an email."
            } else if (!this.user.password) {
                this.error = true
                this.errorMsg = "Please enter a password."
            } else {
                this.$store.dispatch("login", { user: this.user })
                .then(() => this.$router.replace("/"))
                .catch(e => {
                    this.error = e.error
                    this.errorMsg = e.message
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
.seper {
    text-align: center;
    padding-bottom: .8em;
    border-bottom: 2px dashed darkorange;
    margin-bottom: .5em;
}
.error {
    color: red;
    font-size: 1em;
    border: 1px solid red;
    padding: 0 .5em;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    width: 250px;
}
</style>
