<template>
    <div id="logo">
        M<span id="ai">AI</span>tisse
    </div>
</template>

<style scoped>
#logo {
    font-size: 8rem;
    width: 100%;
    color: var(--c-header);
    text-align: center;
    margin-top: 13rem;

    text-shadow: 3px 3px 10px black;
    transition: all 0.5s;
}

#ai {
    display: inline-block;
    color: var(--c-primary);
    rotate: 0deg;
    font-size: 9rem;

    transition: all 0.8s;
}

#logo:hover #ai {
    margin-left: 20px;
    margin-right: 20px;

    background: linear-gradient(90deg, red, orange);
    background-clip: text;
    color: transparent;
    text-shadow: none;

    font-size: 12rem;
    rotate: 370deg;

    animation: hue_shift 2s infinite linear;
}

@keyframes hue_shift {
    0% {
        filter: hue-rotate(0deg);
    }

    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
