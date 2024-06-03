<template>
    <div>
        <TresCanvas>
            <TresPerspectiveCamera />
            <OrbitControls />
            <primitive :object="stuff" />
            <TresAmbientLight />
        </TresCanvas>
    </div>
</template>

<script setup lang="ts">
import { TresCanvas, useLoader } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { OBJLoader } from 'three/addons/loaders/OBJLoader'

let props = defineProps<{
    url: string,
}>();

console.log(OBJLoader);
const stuff = await useLoader(OBJLoader, props.url)
console.log(stuff); 
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
