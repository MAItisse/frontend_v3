<template>
    <h1>{{ workflow.name }}</h1>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { WORKFLOWS } from '../workflows';

let route = useRoute()
let router = useRouter()

// @ts-ignore params might also be a array
let workflow_key: ComputedRef<string> = computed(() => route.params.workflow)

let workflow = computed(() => {
    let workflow = WORKFLOWS[workflow_key.value];

    if (workflow === undefined) {
        router.push({ path: "/" });
        return;
    }

    return workflow;
});
</script>
