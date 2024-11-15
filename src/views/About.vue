<template>
    <div id="logo">
        M<span id="ai">AI</span>tisse
    </div>
    <div id="discovery">
        <h1>Discovery</h1>
        <p>See what others have made</p>
        <!-- <FilterSelector /> -->
        <div id="filters">
            <div v-for="(_, key) in filters" :key="key">
                <input type="checkbox" v-model="filters[key]" :id="key">
                <label :for="key">{{ key.replace('Images', '').replace('Image', '').replace('ackground', 'g') }}</label>
            </div>
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
        createImage: false,
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
#logo {
    font-size: 8rem;
    width: 100%;
    color: var(--c-header);
    text-align: center;
    /* margin-top: 13rem; */

    text-shadow: 3px 3px 10px black;
    transition: all 0.5s;
}

@media(max-width: 600px) {
    #logo {
        font-size: 4rem;
    }

    img {
        width: 100%;
    }
}


@media(orientation: landscape) {
    #logo {
        margin-top: 0px;
    }
}

#ai {
    display: inline-block;
    color: var(--c-primary);
    rotate: 0deg;
    font-size: 1.2em;

    transition: all 0.8s;
}

#logo:hover #ai {
    /* margin-left: 20px;
    margin-right: 20px; */

    background: linear-gradient(90deg, red, orange);
    background-clip: text;
    color: transparent;
    text-shadow: none;

    /* font-size: 1.5em; */
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

#product_list {
    font-size: 4rem;
    text-align: center;

    transform: translateX(50px);
}

@media(max-width: 1000px) {
    #product_list {
        display: none;
    }
}

#typing {
    display: inline-block;
    height: 1em;
    width: 5px;
    background: var(--c-primary);

    animation: blink 1s step-start infinite;
    transform: translateX(-0.3em);
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

label {
    font-size: 1rem;
}

input {
    width: 30px;
    height: 30px;
}

#filters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamically adjusts columns */
    gap: 10px; /* Space between grid items */
}

#filters div {
    display: flex;
    align-items: center;
    gap: 5px; /* Space between the checkbox and the label */
    overflow: hidden; /* Prevents content overflow */
}

#filters label {
    white-space: normal; /* Allows text to wrap to the next line */
    overflow: visible; /* Ensures full visibility of text */
    word-break: break-word; /* Breaks words if they are too long */
}




#discovery {
    padding-left: 15px;
}

button {
    margin: 10px 10px 0px 0px;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    padding: 5px 10px;
    text-align: center;
    cursor: pointer;
    background-color: #007bff; /* Button background color */
    color: white;
    border: none;
    border-radius: 4px; /* Rounded corners */
    transition: background-color 0.3s ease; /* Hover effect */
}

button:hover {
    background-color: #0056b3; /* Darker hover effect */
}
</style>
