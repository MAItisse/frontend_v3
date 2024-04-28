<template>
    <img v-for="image in results" :key="image" v-lazy="image" />
</template>

<script setup lang="ts">
import { useDiscord } from '@/stores/discord';
import { ref, watch, type Ref } from 'vue';

let discord = useDiscord();

const imagesDataUrl = "https://deepnarrationapi.matissetec.dev/getUserImages"

const imageFilter = ref({
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

const images: Ref<string[]> = ref([]);

async function load_images() {
    let url = `${imagesDataUrl}/${discord.info.user_id}?filter=${filter_to_comma(imageFilter.value)}`;
    let result = await fetch(url);
    let data = await result.json();

    images.value = data;
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
