<template>
    <input v-model="search" id="search" placeholder="Create Image" type="text" />

    <div id="list">
        <div v-for="(value, name) in filterd" :key="name">
            <RouterLink :to="`/${name}`" class="item">
                <mdicon :name="value.icon" size="35px" class="icon" />
                <h1>{{ value.name }}</h1>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { WORKFLOWS } from '@/workflows';
import { computed, ref, type ComputedRef } from 'vue';

let search = ref("")

function match(a: string, b: string): boolean {
    return a.toLowerCase().includes(b.toLowerCase());
}

let filterd = computed(() => {
    return Object.fromEntries(Object.entries(WORKFLOWS).filter(([name, value]) => {
        if (match(value.name, search.value)) {
            return true;
        }
        if (value.tags !== undefined) {
            for (const tag of value.tags) {
                if (match(tag, search.value)) {
                    return true;
                }
            }
        }

        return false;
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
    border: 2px solid var(--color-border);
    margin: 1px;
    display: flex;
    align-items: center;
}

.item>h1 {
    font-size: 1rem;
}

@media (max-width: 500px) {
    .item>h1 {
        font-size: 2rem;
        /* Larger text for better readability */
    }

    .item {
        padding: 15px;
        /* Larger touch area */
        box-shadow: none;
        /* Removing box-shadow by default */
        border-width: 1px;
        /* Thinner border on smaller screens */
    }

    .item:active {
        /* Mimicking hover effect for touch */
        background-color: var(--color-background-highlight);
        border-color: var(--color-primary);
        transform: scale(.98);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
}


.icon {
    align-self: center;
}

.item>* {
    display: inline;
}

.item {
    background: var(--color-background-mute);
    border: 2px solid var(--color-border);
    margin: 1px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    /* Smooth transition for all changes */
}

.item:hover {
    background-color: var(--color-background-highlight);
    /* Lighter background on hover */
    border-color: var(--color-primary);
    /* Highlighted border color */
    transform: scale(.99);
    /* Slight scale */
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Subtle shadow */
}

.item:hover h1 {
    color: var(--color-text-highlight);
    /* Text color change on hover */
}
</style>
