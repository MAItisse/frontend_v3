<template>
    <header>
        <img src="/favicon.png" />
        <h1>JifForgeAi</h1>
    </header>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { watch } from "vue";

let os_theme = "light";
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    os_theme = "dark";
}

let theme = useStorage("theme", os_theme)

watch(theme, () => {
    document.documentElement.setAttribute("data-theme", theme.value);
}, { immediate: true })
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
}

img {
    margin-right: 20px;
    height: 4.5rem;
}

h1 {
    color: var(--color-heading);

}
</style>
