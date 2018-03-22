<template>
    <div @login="showUserInfo">


        <nuxt/>

        <my-footer/>
    </div>
</template>

<script>


import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'
import Tabform from '~/components/Tabform.vue'
import Tabs from '~/components/Tabs.vue'

export default {
    components: {
        MyHeader,
        Nav,
        Tabform,
        Tabs,
        MyFooter
    },
    data() {
        return {
            user: {
            }
        }
    },
    mounted() {

    },
    methods: {
        showUserInfo() {
            console.log("User: ", this.user);
        }
    }
}
</script>

<style>
.container
{
    margin: 0;
    width: 100%;
    padding: 100px 0;
    text-align: center;
}

</style>
