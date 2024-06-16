<template>
    <div v-if="props.url.endsWith('obj')">
        <suspense v-if="load">
            <ModelViewer :url="props.url" />
            <template #fallback>
                <ResultViewer url="/loading.gif" />
            </template>
        </suspense>
        <div ref="loading_elem" v-else>
            <ResultViewer url="/loading.gif" />
        </div>
    </div>
    <img v-else v-lazy="props.url">
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core'
import { watch } from 'vue';

let props = defineProps<{
    url: string,
}>();

let load = ref(false);

const loading_elem = ref(null);
const visible = useElementVisibility(loading_elem);

watch(() => visible.value, () => {
    if (visible.value) {
        load.value = true;
    }
})
</script>

<style scoped></style>
