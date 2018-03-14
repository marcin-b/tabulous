<template lang="html">

    <form
        @submit.prevent="submitReg"
        class="form">

        <h2>Sign Up</h2>

        <input
            v-model="user.name"
            type="text"
            placeholder="Username"
            required />
        <input
            v-model="user.email"
            type="email"
            placeholder="email@example.com"
            required />
        <input
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
        <span v-if="error">Cannot sign up without a <span class="error">{{errorMsg}}</span></span>
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
    methods: {
        swapRegLog() {
            this.$emit("swap", true)
        },
        submitReg() {
            console.log("Sign up data sent");
            axios.post("api/signup", this.user)
                .then(({data}) => {
                    if(data.error.code == 23505) {
                        this.error = true;
                        this.errorMsg = "This email is already registered"
                    } else if (data.error.code == 23502) {
                        console.log("err data", data);
                        this.error = true;
                        this.errorMsg = data.error.column
                    }
                    // location.replace("/")
                    console.log("resp Data ", location);
                })

        }
    },

}

</script>

<style lang="css">

.error {
    color: red;
}

</style>
