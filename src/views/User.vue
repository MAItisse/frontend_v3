<template>
    <div id="filters">
        <div v-for="(_, key) in filters" :key="key">
            <input type="checkbox" v-model="filters[key]" :id="key">
            <label :for="key">{{ key.replace('Images', '').replace('Image', '').replace('ackground', 'g') }}</label>
        </div>
        <div>
            <button @click="selectAllFilters(true)">Select All</button>
            <button @click="selectAllFilters(false)">Select None</button>
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
    similarImages: false,
    combineImage: false,
    rethemeImage: false,
    outpaintImage: false,
    stickerBomb: false,
    cannyFaceswap: false,
    qrCode: false,
    imageBackgroundRemoval: false,
    spinMe: false,
    dancerGif: false,
    faceswap: false,
    backgroundExtenderGif: false,
    videoBackgroundRemoval: false,
    createModel: false,
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

function selectAllFilters(selectAll: boolean) {
    Object.keys(filters.value).forEach(key => {
        filters.value[key] = selectAll;
    });
}

watch(() => discord.dataLoaded, () => {
    if (discord.dataLoaded) {
        load_images();
    }
}, { immediate: true });

let ongoing_fetch: Ref<undefined | number> = ref(undefined);
watch(filters.value, () => {
    if (ongoing_fetch.value !== undefined) {
        clearTimeout(ongoing_fetch.value);
    }

    ongoing_fetch.value = setTimeout(() => {
        ongoing_fetch.value = undefined;
        load_images();
    }, 1000);
});
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

button {
    margin-right: 10px;
    padding: 10px;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>
