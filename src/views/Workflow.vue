<template>
    <h1 id="name">{{ workflow.name }}</h1>
    <div id="inputs">
        <div v-for="input in workflow.inputs" :key="input.key" class="input">
            <h1>{{ input.name }}</h1>
            <PromptInput :data="input" class="elem" v-model="inputs[input.key]" />
        </div>
    </div>

    <button id="button" @click="generate" :disabled="!button_active">
        {{ button_active ? "Generate" : "Generating..." }}
    </button>

    <img :src="result" v-if="result !== undefined" />
    <div id="spacer" />
</template>

<script setup lang="ts">
import { type ComputedRef, computed, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { WORKFLOWS } from '../workflows';
import { useDiscord } from '@/stores/discord';
import { useStorage } from '@vueuse/core';

let route = useRoute()
let router = useRouter()
let discord = useDiscord()

// @ts-ignore params might also be a array
let workflow_key: ComputedRef<string> = computed(() => route.params.workflow)

let workflow = computed(() => {
    let workflow = WORKFLOWS[workflow_key.value];

    if (workflow === undefined) {
        router.push({ path: "/" });
        return WORKFLOWS["create"]
    }

    return workflow;
});

let inputs: Ref<{
    [key: string]: string,
}> = useStorage("inputs", {});

let button_active = ref(true);

let result: Ref<undefined | string> = ref(undefined);

async function generate() {
    button_active.value = false;

    let data = {
        discordId: discord.info.user_id,
        discordUsername: discord.info.username,
        accessToken: discord.token,
        ...inputs.value
    };
    let response = await fetch(`https://deepnarrationapi.matissetec.dev/${workflow.value.endpoint}`, {
        method: "POST",
        body: JSON.stringify(data)
    });

    let result_url = await response.text();

    while (true) {
        try {
            let resp = await fetch(result_url);

            if (resp.status === 200) {
                break;
            }
        } catch { }

        await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    result.value = result_url;
    button_active.value = true;
    console.log("DONE")
}
</script>

<style scoped>
#name {
    width: 100%;
    text-align: center;
    font-size: 4rem;
    margin-top: 40px;
}

.input {
    display: flex;
    margin-bottom: 20px;
}

.input>h1 {
    margin-left: 40px;
    font-size: 2.5rem;
}

.input>.elem {
    flex: 1;
    margin: 0px 40px;
}

#button {
    margin-left: 50%;
    transform: translateX(-50%);

    margin-top: 20px;

    width: 400px;
    font-size: 2rem;

    background-color: rgb(60, 110, 60);
    border: 3px solid rgb(90, 140, 90);
    box-shadow: 5px 5px 4px black;
    border-radius: 10px;

    transition: all 0.3s;
}

#button:hover {
    background-color: rgb(130, 180, 130);
}

#button:active:not(:disabled) {
    box-shadow: 0px 0px 4px black;
    translate: 5px 5px;
}

#button:disabled {
    width: 240px;
    background-color: rgb(140, 150, 250);
    color: white;
}

img {
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 40px;
}

#spacer {
    margin-bottom: 300px;
}
</style>

