<template>
    <div>
        <textarea v-model="textInput"></textarea>
        <input type="range" v-model="sliderValue" value="40" min="10" max="128" />
        <div>
            <canvas ref="canvas" width="500" height="500"></canvas>
        </div>
        <button @click="downloadImage">Download Image</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
    url: string,
}>();

const textInput = ref<string>("");
const canvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = 500;
const canvasHeight = 500;
const sliderValue = ref<number>(40);
let txtSize = 40;

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

function drawCanvas() {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas before redrawing
    
    txtSize = +sliderValue.value;
    let x = 0;
    let y = 0;

    for (let c of textInput.value.toLowerCase()) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.width = txtSize;
        img.height = txtSize;
        img.style.marginRight = txtSize + "px";
        if (c in letterMappings) {
            img.src = `${props.url}${letterMappings[c]}`;
        } 
        else {
            img.src = `${props.url}space/png`;
        }
        img.onload = () => {
            ctx.drawImage(img, x, y, txtSize, txtSize);
            x += txtSize;

            if (x + txtSize > canvasWidth) {
                x = 0;
                y += txtSize;
            }
        };
    }
}

function downloadImage() {
    if (!canvas.value) return;
    const imgData = canvas.value.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'download.png';
    link.click();
}

// Watch textInput and call drawCanvas whenever it changes
watch(textInput, drawCanvas);
watch(sliderValue, drawCanvas);

// Call drawCanvas when the component is mounted
onMounted(drawCanvas);
</script>
  
<style scoped>
textarea {
    width: 100%;
    height: 100px;
}

div {
    margin-top: 10px;
}
</style>
