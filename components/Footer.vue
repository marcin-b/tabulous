<template>

    <footer>

        <img src="/img/logo_bw_200px.png" alt="Tabulous">

        &copy 2018 Marcin Balinski



    </footer>

</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
footer {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #eee;
    border-top: 1px solid black;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 1);
    color: #222;
    font: normal normal 1em/200% "Muli", sans-serif;
    text-align: center;
    padding: 2em 0;
    align-self: flex-end;
    width: 100%;
}
img {
    display: block;
    margin-bottom: 1em;
}
</style>
