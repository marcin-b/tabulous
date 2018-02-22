<template>
  <section class="container">
    <h1 class="title">
       {{tab.title}}
    </h1>
    <h2 class="info">

    </h2>
    <nuxt-link class="button" to="/">
      Back
    </nuxt-link>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
    name: 'id',
    data () {
        return {
            tab: {}
        }
    },

    head () {
        return {
            title: this.tab.title
        }
    },
    mounted () {
        axios.get("/api/tab/" + params.id)
            .then(({data}) => {

                console.log("tab get resp data:", data);
                this.tab = data
                console.log("tabs:", this.sortedTabs);
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
