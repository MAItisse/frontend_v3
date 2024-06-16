<template>
    <h1 id="name">{{ workflow.name }}</h1>
    <div id="inputs">
        <template v-for="input in workflow.inputs" :key="input.key">
            <h1 class="name">{{ input.name }}</h1>
            <PromptInput :data="input" class="elem" v-model="inputs[input.key]" />
        </template>
    </div>

    <button id="button" @click="generate" :disabled="!button_active || !all_inputs_entered">
        {{ button_active ? (all_inputs_entered ? "Generate" : "Empty inputs") : "Generating..." }}
    </button>

    <div v-if="result !== undefined">
        <pre v-if="workflow.type === 'llm'" id="result-text">{{ result }}</pre>
        <suspense v-else>
            <ResultViewer :url="result" id="result" />
            <template #fallback>
                <ResultViewer url="/loading.gif" class="img" />
            </template>
        </suspense>
    </div>
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

let all_inputs_entered = computed(() => {
    return workflow.value.inputs.map((inp) => inputs.value[inp.key] !== "" && inputs.value[inp.key] !== undefined).reduce((a, b) => a && b);
})

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

    if (workflow.value.type === "llm") {
        let data = await response.json();
        result.value = data.choices[0].message.content;
        button_active.value = true;
        return;
    }

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

#inputs {
    display: grid;
    row-gap: 20px;
    column-gap: 20px;
    grid-template-columns: max-content auto;

    margin-left: 40px;
    /* If you change this you need to change the px value in the css for the 
        img tag in PromptInput.vue */
    margin-right: 40px;

}

.name {
    grid-column: 1;
    font-size: 2.5rem;
}

.elem {
    grid-column: 2;
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

#spacer {
    margin-bottom: 300px;
}

#result {
    max-width: 100%;
    max-height: 70vh;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 40px;
}

#result-text {
    font-size: 1.4rem;
    margin: 60px;
    white-space: pre-wrap;
}
</style>

