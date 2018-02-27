<template>
    <header>
        <span id="logo">Tabulous</span>
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
    align-items: center;
    background-color: #222;
    color: darkorange;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    padding: 0 1em;
    z-index: 5;
}
header > * {
    z-index: 5;
}
header span {
    box-sizing: border-box;
    font-family: "Rock Salt", script;
    font-size: 3em;
    font-weight: 400;
    display: block;
    line-height: 200%;
    align-self: flex-end;
    text-shadow: 1px 2px 3px #000;
}
.search {
    display: flex;
    align-items: center;
}
header input {
    font-family: Muli;
    border: 1px solid;
    font-size: 1.2em;
    line-height: 100%;
    height: 1.8em;
    width: 180px;
    padding: 0 0 0 .5em;
}
header input:focus {
    border: 1px solid darkorange;
}
header button {
    margin: 0 .3em;
    padding: .2em .3em;
    cursor: pointer;
    background-color: transparent;
    height: 2.6em;
    width: 2.7em;
    border: 1px solid darkorange;
}
header button:hover {
    background-color: darkorange;

}
header button img {
    align-self: center;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg)
}

</style>
