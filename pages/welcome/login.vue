<template lang="html">

    <form @submit.prevent="submitLog" class="form">

        <h2>Login</h2>

        <input type="text" name="" placeholder="Username">
        <input type="password" name="" placeholder="password">
        <button type="submit" name="button">Login</button>

        If you are not registered
        <span
            @click="swapRegLog"
            class="swapper">
            Sign Up
        </span>

    </form>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    name: "Login",
    data () {
        return {
            user: {},
            errorMsg: "",
        }
    },
    methods: {
        swapRegLog() {
            this.$emit("swap", false)

        },
        submitLog() {

            console.log("SUB", this.token);

            axios.post("api/login", this.user)
                .then(({data}) => {
                    console.log("resp Data", data);
                })
                .catch(err => console.log("Login Error: ", err))

        }
    },
    // created() {
    //     axios.get('/api/getcsrftoken')
    //     .then((response) => {
    //         console.log("token resp", response.data)
    //         axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
    //         // this.token = response.data.csrfToken
    //     }, (err) => {
    //         console.log("Error getting Token: ", err)
    //     })
    // },

}
</script>

<style lang="css">
a {
    color: #eee;
}


</style>
