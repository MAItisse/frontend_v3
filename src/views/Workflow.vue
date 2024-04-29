<template>
    <h1>Hmmm {{ workflow }}</h1>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from 'vue';
import { useRoute } from 'vue-router'

let route = useRoute()

// @ts-ignore params might also be a array
let workflow: ComputedRef<string> = computed(() => route.params.workflow) 
</script>
