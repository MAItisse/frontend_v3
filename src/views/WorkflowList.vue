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

    #list {
        grid-template-columns: repeat(auto-fill, minmax(125px, 1fr)); /* Smaller items for smaller screens */
        grid-auto-rows: 125px;
    }

    .item {
        padding: 8px;
    }

    .item h1 {
        font-size: 0.9rem; /* Adjust text size for smaller screens */
    }

    .item .icon {
        font-size: 1.5rem; /* Adjust icon size for smaller screens */
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

#list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); /* Dynamically adjust columns */
    gap: 10px; /* Space between items */
    grid-auto-rows: 150px;
    padding: 10px; /* Optional: Padding around the grid */
}

.item {
    background: var(--color-background-mute);
    border: 2px solid var(--color-border);
    padding: 10px;
    display: flex;
    flex-direction: column; /* Stack icon and text vertically */
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: all 0.3s ease; /* Smooth transition for hover effects */
    cursor: pointer;
    box-sizing: border-box;
    height: 100%;
}

.item:hover {
    background-color: var(--color-background-highlight);
    border-color: var(--color-primary);
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item h1 {
    margin-top: 10px;
    font-size: 1rem;
    color: var(--color-text-primary);
    text-align: center;
    word-wrap: break-word;
    flex-shrink: 0;
}

.item:hover h1 {
    color: var(--color-text-highlight); /* Change text color on hover */
}

.item .icon {
    font-size: 2rem; /* Adjust icon size */
    color: var(--color-icon-primary);
    transition: color 0.3s ease;
}

.item:hover .icon {
    color: var(--color-icon-highlight); /* Change icon color on hover */
}
</style>
