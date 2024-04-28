import { defineStore } from "pinia";
import { type RemovableRef, useStorage } from "@vueuse/core";
import { computed, ref } from "vue";

const DISCORD_BASE = "https://discord.com/api/v10/";
const DISCORD_CLIENT_ID = "1142575897753440288";
const DISCORD_USER_INFO_URL = `${DISCORD_BASE}/users/@me`

const HOST = document.location.host;
const PROTOCOL = HOST.includes("localhost") ? "http" : "https";
const DISCORD_LOGIN_URL = `${DISCORD_BASE}/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${PROTOCOL}%3A%2F%2F${HOST}%2F&response_type=token&scope=identify`

export const useDiscord = defineStore("discord", () => {
    const token: RemovableRef<null | string> = useStorage("discord-token", null);


    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [access_token, token_type] = [fragment.get('access_token'), fragment.get('token_type')];

    if (access_token !== null) {
        token.value = `${token_type} ${access_token}`;
        setTimeout(() => document.location.hash = "", 100)
    }

    const loggedIn = computed(() => token.value !== null);

    function login(): never {
        document.location = DISCORD_LOGIN_URL;
        throw new Error("redirect?");
    }

    function logout() {
        token.value = null;
    }

    let info = ref({
        user_id: -1,
        username: "MISSING",
        avatar: "MISSING"
    });

    async function loadUserData() {
        if (token.value === null) {
            login();
        }


        let response = await fetch("https://discord.com/api/users/@me", {
            headers: {
                authorization: token.value,
            }
        });
        if (response.status != 200) {
            login();
        }
        let data = await response.json();

        info.value = {
            user_id: data.id,
            username: data.username,
            avatar: data.avatar,
        };
    }
    loadUserData();

    let avatarUrl = computed(() => `https://cdn.discordapp.com/avatars/${info.value.user_id}/${info.value.avatar}.png`)

    return { token, info, avatarUrl, loggedIn, logout }
})
