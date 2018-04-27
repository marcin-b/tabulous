<template>
    <section class="col-cont">

        <h1>Reset your password</h1>

        <form @submit.prevent="">
            email
            <input type="email" v-model="email" placeholder="example@gmail.com" required />
            <button type="submit">Submit</button>
        </form>


    </section>
</template>

<script>
export default {
    data() {
        return {
            email: ""
        }
    },
    methods: {
        submit() {

        }
    }
}
</script>

<style scoped>

form {
    align-items: center;
    border: 2px dashed darkorange;
    background-color: rgba(0, 0, 0, .5);
    color: #eee;
    display: flex;
    flex-direction: column;
    font: normal 1em/150% "Muli", sans-serif;
    z-index: 2;
    padding: 1em;
}
form > input {
    border: 1px solid #222;
    box-shadow: 1px 2px 3px rgba(0,0,0,.7);
    font: normal 1.2em/150% "Muli", sans-serif;
    padding-left: .5em;
    margin-bottom: 1em;
    height: 2em;
    width: 250px;
}
form > button {
    background-color: darkorange;
    color: black;
    border: 1px solid darkorange;
    cursor: pointer;
    font: normal 400 1.5em/130% "Muli", sans-serif;
    text-rendering: optimizeLegibility;
    margin: 0 0 .8em;
    padding: 0 .8em;
    box-shadow: 1px 2px 3px rgba(0,0,0,.7);
    transition: transform ease .1s;
}
form > button:hover {
    transform: scale(1.2, 1.2) ;
    color: white;
    background: rgba(0, 0, 0, .5);
}
form > button:focus, .form > button:active {
    color: white;
    background: rgba(0, 0, 0, .5);
}

</style>
