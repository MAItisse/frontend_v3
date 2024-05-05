<template>
    <input v-if="props.data.type === 'text'" type="text" :placeholder="props.data.placeholder" v-model="value" />
</template>

<script setup lang="ts">
import { type InputType } from "../workflows";

let props = defineProps<{
    data: InputType
}>();

let value = defineModel();
</script>
