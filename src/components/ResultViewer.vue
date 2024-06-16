<template>
    <div v-if="props.url.endsWith('obj')">
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
    <img v-else v-lazy="props.url">
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core'

let props = defineProps<{
    url: string,
}>();

const elem = ref(null);
const visible = useElementVisibility(elem);
</script>

<style scoped></style>
