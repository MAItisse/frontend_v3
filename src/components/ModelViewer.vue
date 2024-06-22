<template>
    <div @mousedown="click">
        <TresCanvas>
            <TresPerspectiveCamera :position="[1, 1, 1]" :look-at="[0, 0, 0]" />
            <primitive :object="obj" />
            <TresAmbientLight />
            <OrbitControls :enable-zoom="false" />
        </TresCanvas>
    </div>
</template>

<script setup lang="ts">
import { TresCanvas, useLoader, dispose } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { OBJLoader } from 'three/addons/loaders/OBJLoader'
import { onUnmounted } from 'vue';
import { onBeforeUnmount } from 'vue';

let props = defineProps<{
    url: string,
}>();

let obj = await useLoader(OBJLoader, props.url)
onBeforeUnmount(() => {
    dispose(obj)
})

function download(url: string) {
    const a = document.createElement('a')
    a.href = url
    a.download = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

function click(mouse: MouseEvent) {
    if (mouse.buttons == 2) {
        download(props.url);
    }
}

</script>

<style scoped>
div {
    width: 500px;
    height: 500px;
    display: inline-block;

    margin: 0px;
    margin-right: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>
