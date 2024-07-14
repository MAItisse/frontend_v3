<template>
    <h1>Discovery</h1>
    <p>See what others have made</p>
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
        // similarImages: false,
        // combineImage: false,
        // rethemeImage: false,
        // relightImage: false,
        // outpaintImage: false,
        // stickerBomb: false,
        // cannyFaceswap: false,
        // qrCode: false,
        // imageBackgroundRemoval: false,
        // alphabetImages: false,
        // spinMe: false,
        // dancerGif: false,
        // backgroundExtenderGif: false,
        // // videoBackgroundRemoval: false,
        // createModel: false,
    });

    async function load_images() {
        let url = `${resultDataUrl}?filter=createImage`; //${filter_to_comma(filters.value)}
        let result = await fetch(url);
        let data = await result.json();

        results.value = data;
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
</style>