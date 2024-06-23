<template>
    <div>
        <textarea v-model="textInput"></textarea>
        <div>
            <template v-for="c in textInput.toLowerCase()">
                <img v-if="c in letterMappings" :src="`${props.url}${letterMappings[c]}`" :alt="c">
                <div class="missing" v-else />
            </template>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

let props = defineProps<{
    url: string,
}>();

const textInput = ref("");
const letterMappings: { [letter: string]: string } = {
    "a": "01_letter/png",
    "b": "02_letter/png",
    "c": "03_letter/png",
    "d": "04_letter/png",
    "e": "05_letter/png",
    "f": "06_letter/png",
    "g": "07_letter/png",
    "h": "08_letter/png",
    "i": "09_letter/png",
    "j": "10_letter/png",
    "k": "11_letter/png",
    "l": "12_letter/png",
    "m": "13_letter/png",
    "n": "14_letter/png",
    "o": "15_letter/png",
    "p": "16_letter/png",
    "q": "17_letter/png",
    "r": "18_letter/png",
    "s": "19_letter/png",
    "t": "20_letter/png",
    "u": "21_letter/png",
    "v": "22_letter/png",
    "w": "23_letter/png",
    "x": "24_letter/png",
    "y": "25_letter/png",
    "z": "26_letter/png"
};
</script>
  
<style scoped>
textarea {
    width: 100%;
    height: 100px;
}

div {
    margin-top: 10px;
}

img,
.missing {
    width: 3rem;
    height: 3rem;
    display: inline-block;
}
</style>
  
