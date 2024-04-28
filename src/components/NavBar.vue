<template>
    <div></div>
    <header>
        <RouterLink to="/">
            <img src="/favicon.png" />
        </RouterLink>
        <RouterLink to="/">
            <h1>MAItisse</h1>
        </RouterLink>
        <RouterLink id="left" to="/user">
            <img id="avatar" :src="discord.avatarUrl" />
        </RouterLink>
        <mdicon id="theme" size="2.5rem" name="theme-light-dark" @click="toggle_theme" />
    </header>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { watch } from "vue";
import { useDiscord } from "@/stores/discord"

let discord = useDiscord();

let os_theme = "light";
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    os_theme = "dark";
}

let theme = useStorage("theme", os_theme)

watch(theme, () => {
    document.documentElement.setAttribute("data-theme", theme.value);
}, { immediate: true })

function toggle_theme() {
    if (theme.value == "dark") {
        theme.value = "light";
    } else {
        theme.value = "dark";
    }
}
</script>

<style scoped>
header {
    width: 100%;
    background-color: var(--c-primary);

    padding: 10px;
    box-shadow: 10px 0px 20px black;
    display: inline-flex;
    height: 5rem;

    align-items: center;

    position: sticky;
    top: 0px;
}

img {
    margin-right: 20px;
    height: 4.5rem;
}

#left {
    margin-left: auto;
}

#avatar {
    height: 3rem;
}

#avatar:hover {
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0% {
        scale: 1;
    }

    50% {
        scale: 1.2;
    }

    100% {
        scale: 1;
    }
}

#theme {
    transition: all 0.5s ease-out;
    color: var(--color-heading)
}

#theme:hover {
    scale: 1.5;
    animation: shake 0.5s infinite linear;
}

@keyframes shake {
    0% {
        rotate: 0deg;
    }

    25% {
        rotate: 10deg;
    }

    75% {
        rotate: -10deg;
    }

    100% {
        rotate: 0deg;
    }
}
</style>
