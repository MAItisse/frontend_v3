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
  <img src="/loading.gif" v-if="ongoing_fetch !== undefined" class="img" />
  <div class="sharedItemsButtons" id="share-options">
    <div>
      <button v-if="results.length > 0" @click="shareObjects">Share Selected Objects</button>
      <button @click="deleteImages">Delete Selected Objects</button>
    </div>
    <div>
      <button @click="showSharedObjects">Show My Shared Objects</button>
      <button v-if="results.length > 0 && showShared" @click="removeSharedObjects">Remove Selected Shared Objects</button>
    </div>
  </div>
  <ResultViewer v-for="image in results" :key="image" :url="image" :selected="selectedImages.includes(image)" @select="toggleImageSelection" />
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
    relightImage: false,
    outpaintImage: false,
    stickerBomb: false,
    cannyFaceswap: false,
    qrCode: false,
    imageBackgroundRemoval: false,
    videoBackgroundRemoval: false,
    alphabetImages: false,
    spinMe: false,
    dancerGif: false,
    backgroundExtenderGif: false,
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
  
  function filter_to_comma(filter: { [key: string]: boolean }): string {
    return Object.entries(filter).filter(([_, val]) => val).map(([key, _]) => key).join(",");
  }
  
  const results: Ref<string[]> = ref([]);
  const showShared: Ref<boolean> = ref(false);
  const selectedImages: Ref<string[]> = ref([]);
  
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
  
  function toggleImageSelection(image: string) {
    const index = selectedImages.value.indexOf(image);
    if (index > -1) {
      selectedImages.value.splice(index, 1);
    } else {
      selectedImages.value.push(image);
    }
  }
  
  async function shareObjects() {
    // Implement sharing functionality here
    console.log('Sharing images:', selectedImages.value);
    for (const image of selectedImages.value) {
        const data = image.split('/');
        console.log(data[4] + " " + data[7]+"."+data[8]);
        await fetch("https://deepnarrationapi.matissetec.dev/setItemPublic", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                workflowName: data[4],
                discordId: data[5],
                jobId: data[6],
                fileName: data[7]+"."+data[8],
            })
        });
    }
  }

  async function showSharedObjects() {
    // Implement showing shared images functionality here
    console.log('Showing shared images');
    let url = `https://deepnarrationapi.matissetec.dev/myPublicResults`;
    let result = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            discordId: discord.info.user_id,
        })
    });
    let data = await result.json();
    console.log(data);
    showShared.value = true;
    results.value = data;
  }

  async function removeSharedObjects() {//630649313860780043/8868341422
    let url = `https://deepnarrationapi.matissetec.dev/unpublishItem`;
    for (const image of selectedImages.value) {
        const data = image.split('/');
        console.log("unpublishing " + data[4] + " " + data[7] + "." + data[8]);
        await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                discordId: data[5],
                jobId: data[6],
            })
        });
    }
    showSharedObjects();
  }

  async function deleteImages() {
    // Implement deleting images functionality here
    console.log('Deleting images:', selectedImages.value);
    for (const image of selectedImages.value) {
        const data = image.split('/');
        console.log(data[4] + " " + data[7]+"."+data[8]);
        await fetch(`https://deepnarrationapi.matissetec.dev/deleteResult/${data[5]}/${data[6]}`);
    }
    selectedImages.value = [];
    load_images();
  }
  
  watch(() => discord.dataLoaded, () => {
    if (discord.dataLoaded) {
      showShared.value = false;
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
      // remove urls that are not in the new filter list filters
      selectedImages.value = selectedImages.value.filter(image => filter_to_comma(filters.value).split(",").some(filter => image.includes(filter)));
      
      showShared.value = false;
      load_images();
    }, 1000);
  });
</script>
  
<style scoped>
  .img {
    max-width: 100%;
    min-width: 500px;
    height: 500px;
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
  
  #share-options {
    margin-top: 20px;
  }

  .sharedItemsButtons {
    display: flex;
  }
</style>
