<template lang="html">
    <p>

        SOME RANDOM TEXT and the Songbook ID {{$route.params.id}}

        <button
        @click="deleteSb"
        type="button"
        >
            Delete
        </button>

    </p>
</template>

<script>
import axios from "~/plugins/axios"

export default {
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
