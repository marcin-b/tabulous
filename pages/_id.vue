<template>
  <section class="container">
    <h1 class="title">
      User {{}}
    </h1>
    <h2 class="info">
      {{ user.name }}
    </h2>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {

    data () {
        return {
            tab: {}
        }
    },
    asyncData ({ params, error }) {
        return axios.get('/api/users/' + params.id)
            .then((res) => {
                return { user: res.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'User not found' })
            })
    },
    head () {
        return {
            title: `User: ${this.user.name}`
        }
    },
    mounted () {
        axios.get("/api/tab/" + params.id)
            .then(({data}) => {

                // console.log("tab get resp data:", data);
                this.tab = data
                // console.log("tabs:", this.sortedTabs);
            })
            .catch(err => console.log("Error getting tabs:", err))
    }
}

</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
