<template>
    <h1>Discovery</h1>
    <p>See what others have made</p>
    <!-- <FilterSelector /> -->
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
    <img src="/loading.gif" v-if="ongoing_fetch !== undefined" class="img" />
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

    const filters = ref({
        createImage: true,
        similarImages: false,
        combineImage: false,
        rethemeImage: false,
        relightImage: false,
        outpaintImage: false,
        stickerBomb: false,
        cannyFaceswap: false,
        qrCode: false,
        imageBackgroundRemoval: false,
        alphabetImages: false,
        spinMe: false,
        dancerGif: false,
        backgroundExtenderGif: false,
        // videoBackgroundRemoval: false,
        createModel: false,
        createStory: false,
        createPoem: false,
        createBackStory: false,
        // createJoke: false,
        // createOneLiner: false,
        // createRiddle: false,
        // createTrivia: false,
        createImageDescription: false,
        // createSongIdea: false,
    });

    async function load_images() {
        let url = `${resultDataUrl}?filter=${filter_to_comma(filters.value)}`;
        let result = await fetch(url);
        let data = await result.json();

        results.value = data;
    }

    function filter_to_comma(filter: { [key: string]: boolean }): string {
        return Object.entries(filter).filter(([_, val]) => val).map(([key, _]) => key).join(",");
    }

    function selectAllFilters(selectAll: boolean) {
        Object.keys(filters.value).forEach(key => {
            filters.value[key] = selectAll;
        });
    }

    watch(filters.value, () => {
        if (ongoing_fetch.value !== undefined) {
            clearTimeout(ongoing_fetch.value);
        }

        ongoing_fetch.value = setTimeout(() => {
            ongoing_fetch.value = undefined;
            load_images();
        }, 1000);
    });
    watch(() => discord.dataLoaded, () => {
        if (discord.dataLoaded) {
            load_images();
        }
    }, { immediate: true });
</script>

<style scoped>
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