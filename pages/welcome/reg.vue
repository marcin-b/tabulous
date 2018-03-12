<template lang="html">

    <form
        @submit.prevent="submitReg"
        class="form">

        <h2>Sign Up</h2>

        <input v-model="user.name" type="text" placeholder="Username">
        <input v-model="user.email" type="text" placeholder="email@example.com">
        <input v-model="user.password" type="password" placeholder="Password">
        <button type="submit" name="button">Submit</button>

        If you already signed up <span
            @click="swapRegLog"
            class="swapper">
            Log in
        </span>
    </form>

</template>

<script>
import axios from "~/plugins/axios"

export default {
    data () {
        return {
            user: {},
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

            console.log("SUB", this.token);

            axios.post("api/signup", this.user)
                .then(({data}) => {
                    console.log("resp Data", data);
                })

        }
    },

}

</script>

<style lang="css">



</style>
