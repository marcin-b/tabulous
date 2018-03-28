<template lang="html">

    <form
        @submit.prevent="submitReg"
        class="form">

        <h2>Sign Up</h2>

        <input
            ref="username"
            id="username"
            v-model="user.name"
            type="text"
            placeholder="Username"
            required
            autofocus/>
        <input
            id="email"
            v-model="user.email"
            type="email"
            placeholder="email@example.com"
            required />
        <input
            id="password"
            v-model="user.password"
            type="password"
            placeholder="Password"
            required />
        <button type="submit" name="button">Submit</button>

        If you already signed up <span
            @click="swapRegLog"
            class="swapper">
            Log in
        </span>
        <span v-if="error" class="error">{{errorMsg}}</span>
    </form>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    data() {
        return {
            user: {},
            errorMsg: "",
            error: false,
        }
    },
    created() {
        axios.get('/api/getcsrftoken')
        .then((response) => {
            console.log("token resp", response.data)
            axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
            // this.token = response.data.csrfToken
        }, (err) => {
            console.log("Error getting Token: ", err)
        })
    },
    mounted() {
        this.$refs.username.focus()
    },
    methods: {
        swapRegLog() {
            this.$emit("swap", true)
        },

        submitReg() {
            // Credential check for lack of Support of "required"
            if (!this.user.name) {
                this.error = true
                this.errorMsg = "Please enter a username."
            } else if (!this.user.email) {
                this.error = true
                this.errorMsg = "Please enter an email."
            } else if (!this.user.password) {
                this.error = true
                this.errorMsg = "Please enter a password."
            } else {

                this.$store.dispatch("signup", { user: this.user })
                .then(() => {
                    this.$router.replace("/")
                    console.log("Signup DONE",)
                    this.user = {}
                })
                .catch(({error}) => {
                    this.error = true
                    if (error.code == 23505) {
                        this.errorMsg = "This email is already signed up"
                    }
                    console.log("Signup NIE udany", error)
                })
            }

        }
    },

}

</script>

<style lang="css">
input + .err-indicator {
    border: 1px solid red;
}
.error {
    font-size: .9em;
    border: 1px solid red;
    padding: 0 .5em;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    width: 250px;
}

</style>
