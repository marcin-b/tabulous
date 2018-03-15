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

            axios.post("/api/login", this.user)
                .then(({data}) => {
                    console.log("Login resp Data", data);
                    if (data.error) { // Wrong Email
                        this.error = true
                        this.errorMsg = data.error
                    } else if (!data.successful) { // Wrong PW
                        this.error = true
                        this.errorMsg = "Wrong password."
                    } else { // All Right
                        let pass = { login: true }
                        this.$router.replace({path:"/", params: {test: true}})
                        console.log("inside Log redir", pass)
                    }

                })
                .catch(err => {
                    console.log("Login Error: ", err)
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
