<template>
    <img v-for="image in results" :key="image" v-lazy="image" />
</template>

<script setup lang="ts">
import { useDiscord } from '@/stores/discord';
import { ref, watch, type Ref } from 'vue';

let discord = useDiscord();

const resultDataUrl = "https://deepnarrationapi.matissetec.dev/getUserResults"

const filters = ref({
    createImage: true,
    similarImages: true,
    combineImage: true,
    rethemeImage: true,
    outpaintImage: true,
    stickerBomb: true,
    cannyFaceswap: true,
    qrCode: true,
    imageBackgroundRemoval: true,
});

function filter_to_comma(filter: { [key: string]: boolean }): string {
    return Object.entries(filter).filter(([_, val]) => val).map(([key, _]) => key).join(",");
}

const results: Ref<string[]> = ref([]);

async function load_images() {
    let url = `${resultDataUrl}/${discord.info.user_id}?filter=${filter_to_comma(filters.value)}`;
    let result = await fetch(url);
    let data = await result.json();

    results.value = data;
}

watch(() => discord.dataLoaded, () => {
    if (discord.dataLoaded) {
        load_images();
    }
}, { immediate: true })
</script>

<style scoped>
img {
    height: 300px;
    display: block;
}
</style>
