<template>
    <div id="pushcont" @login="showUserInfo">


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
    methods: {
        showUserInfo() {
            console.log("User: ", this.user);
        }
    }
}
</script>

<style>
/* .pushcont {
    display: flex;
    flex-direction: column;
    height: 100vh;
} */
</style>
