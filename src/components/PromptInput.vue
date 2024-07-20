<template>
    <input v-if="props.data.type === 'text'" type="text" :placeholder="props.data.placeholder" v-model="value" />
    <div v-else-if="props.data.type === 'image'">
        <input type="text" placeholder="Url" v-model="value" />
        <img v-lazy="value" />
    </div>
    <input v-else-if="props.data.type === 'number'" type="number" v-model="value" min="0" />
    <select v-else-if="props.data.type === 'dropdown'" v-model="value" required>
        <option v-for="name, key in props.data.options" :key="key" :value="key">{{ name }}</option>
    </select>
</template>

<script setup lang="ts">
import { watch, type ModelRef } from "vue";
import { type InputType } from "../workflows";

let props = defineProps<{
    data: InputType
}>();

let value: ModelRef<number | string | undefined> = defineModel();

watch(value, () => {
    let value = value.value;
    if (typeof value == number && number < 0) {
        value.value = 0;
    }
})
</script>

<style scoped>
input {
    width: 100%;
}

img {
    max-height: 300px;
    position: relative;
    left: calc(-50vw + 100% + 40px);
    transform: translateX(-50%);
}
</style>
