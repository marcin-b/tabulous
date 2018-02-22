<template>
    <div>
        <my-header/>

        <nuxt/>

        <my-footer/>
    </div>
</template>

<script>
import axios from '~/plugins/axios'
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
    mounted () {
        axios.get("/api/tabs")
        .then(tabs => {
            console.log("tab get resp data:", tabs);
            return {
                tabs: tabs
            }

        })
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

.button, .button:visited
{
    display: inline-block;
    color: black;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
}

.button:hover, .button:focus
{
    color: #fff;
    background-color: #000;
}

.title
{
    color: #000;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
}
</style>
