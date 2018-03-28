<template lang="html">
    <section>
        <nuxt-link to="/profile/songbooks">
            Back to your songbooks
        </nuxt-link>
        <h2>{{songbook.name}} id : {{$route.params.id}}</h2>

        <ul>
            <li
                v-for="(tab, index) in songbook.tabs"
                :key="index" >
                Tab id: {{tab}}
            </li>
        </ul>
        <button
        @click="deleteSb"
        type="button" >
            Delete
        </button>

    </section>
</template>

<script>
import axios from "~/plugins/axios"

export default {
    data() {
        return {
            songbook: {}
        }
    },
    asyncData(context) {
        return axios.get("/api/songbook/" + context.params.id)
        .then(({data}) => {
            console.log("get SB: ", data)
            return {
                songbook: data
            }
        })
        .catch(err => console.log("get SB err: ", err))
    },
    methods: {
        deleteSb() {
            // Confirm before delete
            if (confirm("Are you sure you want to delete this Songook?")) {

                axios.delete("/api/delete-songbook/" + this.$route.params.id)
                .then(({data}) => {
                    this.$nuxt.$router.replace("/profile/songbooks")
                    console.log("delete result", data)

                })
            }
        }
    }
}
</script>

<style>

</style>
