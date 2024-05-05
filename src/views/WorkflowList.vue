<template>
    <input v-model="search" id="search" placeholder="Create Image" type="text" />

    <div id="list">
        <div v-for="(value, name) in filterd" :key="name">
            <RouterLink :to="`/${name}`" class="item">
                <mdicon :name="value.icon" size="60px" class="icon" />
                <h1>{{ value.name }}</h1>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { WORKFLOWS } from '@/workflows';
import { computed, ref, type ComputedRef } from 'vue';

let search = ref("")

let filterd = computed(() => {
    return Object.fromEntries(Object.entries(WORKFLOWS).filter(([name, value]) => {
        return value.name.toLowerCase().includes(search.value.toLowerCase())
    }))
})
</script>

<style scoped>
#search {
    width: calc(100% - 60px);
    margin: 50px 30px 0px 30px;
}


.item {
    background: var(--color-background-mute);
    border: 5px solid var(--color-border);
    margin: 10px;
    display: flex;
}

.item>h1 {
    font-size: 3rem;
}

.icon {
    align-self: center;
}

.item>* {
    display: inline;
}
</style>
