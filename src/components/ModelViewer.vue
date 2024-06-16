<template>
    <div @scroll="scroll">
        <TresCanvas>
            <TresPerspectiveCamera :position="[1, 1, 1]" :look-at="[0, 0, 0]" />
            <primitive :object="obj" />
            <TresAmbientLight />
            <OrbitControls :enable-zoom="false" />
        </TresCanvas>
    </div>
</template>

<script setup lang="ts">
import { TresCanvas, useLoader } from '@tresjs/core'
import { OrbitControls, ScrollControls } from '@tresjs/cientos'
import { OBJLoader } from 'three/addons/loaders/OBJLoader'

let props = defineProps<{
    url: string,
}>();

const obj = await useLoader(OBJLoader, props.url)

function scroll(event: Event) {
    console.log("SCROLL");
}
</script>

<style scoped>
div {
    width: 300px;
    height: 300px;
    display: inline-block;

    margin: 0px;
    margin-right: 10px;
}
</style>
