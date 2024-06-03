<template>
    <ModelViewer v-if="props.url.endsWith('obj')" :url="props.url" />
    <img v-else v-lazy="props.url">
</template>

<script setup lang="ts">
let props = defineProps<{
    url: string,
}>();
</script>
