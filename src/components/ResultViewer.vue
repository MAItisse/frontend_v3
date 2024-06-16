<template>
    <suspense v-if="props.url.endsWith('obj')">
        <ModelViewer :url="props.url" />
        <template #fallback>
            <ResultViewer url="/loading.gif" class="img" />
        </template>
    </suspense>
    <img v-else v-lazy="props.url">
</template>

<script setup lang="ts">
let props = defineProps<{
    url: string,
}>();
</script>
