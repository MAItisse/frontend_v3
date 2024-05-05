<template>
    <input v-if="props.data.type === 'text'" type="text" :placeholder="props.data.placeholder" v-model="value" />
    <div v-else-if="props.data.type === 'image'">
        <input type="text" placeholder="Url" v-model="value" />
        <img v-lazy="value" />
    </div>
</template>

<script setup lang="ts">
import { type InputType } from "../workflows";

let props = defineProps<{
    data: InputType
}>();

let value = defineModel();
</script>

<style scoped>
input {
    width: 100%;
}

img {
    max-height: 300px;
    margin-left: 50%;
    transform: translate(-50%);
}
</style>
