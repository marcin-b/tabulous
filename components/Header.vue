<template>
    <header>
        <span>Tabulous</span>
        <div class="search">

            <input type="text" name="search" value="">
            <button type="buttton" name="submit" value="">
                <img src="~/assets/img/null.png" alt="">
            </button>
        </div>

    </header>
</template>

<style>
header {
    height: 4em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    background-color: #333;
    color: darkorange;
    padding: 0 1em;
}
header span {
    display: block;
    font-family: "Rock Salt", script;
    font-size: 2em;
    line-height: 150%;
    letter-spacing: .05em;
    font-weight: 400;
    box-sizing: border-box;
}
.search {
    background-color: darkorange;
    display: flex;
    align-items: center;
}
header input {
    font-size: 1.2em;
    line-height: 100%;
    height: 1.8em;
    width: 180px;
}
header button {
    margin: 0 0.5em;
    padding:0;
    cursor: pointer;
    background-color: transparent;
    height: 2.5em;
    width: 2.5em;
    border: 0;
}
header button img {
    align-self: center;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg)
}

</style>
