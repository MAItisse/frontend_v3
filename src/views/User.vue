<template>
    <div id="filters">
        <div v-for="(_, key) in filters">
            <input type="checkbox" v-model="filters[key]" :id="key">
            <label :for="key">{{ key.replace('Images', '').replace('Image', '').replace('ackground', 'g') }}</label>
        </div>
    </div>
    <img src="/loading.gif" v-if="ongoing_fetch !== undefined" />
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
    spinMe: true,
    dancerGif: true,
    faceswap: true,
    backgroundExtenderGif: true,
    videoBackgroundRemoval: true,
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

let ongoing_fetch: Ref<undefined | number> = ref(undefined);
watch(filters.value, () => {
    if (ongoing_fetch !== undefined) {
        clearTimeout(ongoing_fetch.value);
    }

    ongoing_fetch.value = setTimeout(() => {
        ongoing_fetch.value = undefined;
        load_images()
    }, 1000)
})
</script>

<style scoped>
img {
    max-width: 100%;
    min-width: 300px;
    height: 300px;
    object-fit: contain;

    display: inline-block;

    margin: 0px;
    margin-right: 10px;
}

label {
    font-size: 2rem;
}

input {
    width: 30px;
    height: 30px;
}

#filters {
    display: grid;
    grid-template-columns: repeat(auto-fill, 500px);
}
</style> 
