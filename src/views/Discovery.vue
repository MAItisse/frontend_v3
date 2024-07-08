<template>
    <h1>Discovery</h1>
    <p>See what others have made</p>
    <ResultViewer v-for="image in results" :key="image" :url="image" class="img" />
</template>

<script setup lang="ts">
    import { useDiscord } from '../stores/discord'
    import { ref, watch, type Ref } from 'vue';
    const results: Ref<string[]> = ref([]);
    let ongoing_fetch: Ref<undefined | number> = ref(undefined);

    let discord = useDiscord();

    load_images();
    const resultDataUrl = "https://deepnarrationapi.matissetec.dev/getPublicResults"

    async function load_images() {
        let url = `${resultDataUrl}?filter=createImage`;
        let result = await fetch(url);
        let data = await result.json();

        results.value = data;
    }
    
    watch(() => discord.dataLoaded, () => {
        if (discord.dataLoaded) {
            load_images();
        }
    }, { immediate: true });
</script>

<style scoped>
</style>