<template>
  <div class="image-container">
    <div v-if="props.url.endsWith('obj')">
      <div :class="['checkbox-overlay', { 'selected': props.selected }]" @click="toggleSelection">
          <input type="checkbox" :checked="props.selected" />
      </div>
      <suspense v-if="visible">
        <ModelViewer :url="props.url" ref="elem" />
        <template #fallback>
          <ResultViewer ref="elem" url="/loading.gif" />
        </template>
      </suspense>
      <div ref="elem" v-else>
        <ResultViewer url="/loading.gif" />
      </div>
    </div>
    <div v-else>
      <div :class="['checkbox-overlay', { 'selected': props.selected }]" @click="toggleSelection">
        <input type="checkbox" :checked="props.selected" />
      </div>
      <p v-if="props.url && isUrlMatch()" @click="toggleSelection">{{ props.url && props.url.match(/[^/]+$/)[0] }}</p>
      <img v-else v-lazy="props.url" @click="toggleSelection">
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  import { useElementVisibility } from '@vueuse/core';
  
  let props = defineProps<{
    url: string,
    selected: boolean,
  }>();
  
  const elem = ref(null);
  const visible = useElementVisibility(elem);
  
  const emit = defineEmits(['select']);
  const textWorkflow = ['createStory', 'createPoem', 'createBackStory', 'createImageDescription']
  function isUrlMatch() {
      return props.url && textWorkflow.some(substring => props.url.includes(substring));
    }

  function toggleSelection() {
    emit('select', props.url);
  }
</script>
  
<style scoped>
  .image-container {
    position: relative;
    display: inline-block;
    margin: 10px;
    width: 500px;
    height: 500px;
  }
  
  .checkbox-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    padding: 5px;
    display: none;
  }
  
  .image-container:hover .checkbox-overlay,
  .checkbox-overlay.selected {
    display: block;
    border: 2px solid #007BFF; /* Adjust the color as needed */
    z-index: 1;
  }
  
  img {
    cursor: pointer;
    width: 100%;
    height: auto;
  }

  p {
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0;
    padding: 10px;
    height: 500px;
    overflow: auto;
  }
</style>
