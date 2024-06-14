<template>
    <div id="logo">
        M<span id="ai">AI</span>tisse
    </div>
    <div id="product_list">
        We have <div id="typing"></div>
        <span style="color: gray">Create Image</span>
        <br />
        <div id="list" data-theme="reverse">
            <div v-for="product in PRODUCTS" :key="product.link" class="item">
                <RouterLink :to="product.link">
                    <mdicon :name="product.icon" size="2.5rem" />
                    {{ product.name }}
                </RouterLink>
            </div>
            <div class="item">
                <RouterLink to="/workflows">
                    ... and more
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Product {
    icon: string,
    name: string, link: string,
} const PRODUCTS: Product[] = [
    {
        icon: "camera-plus",
        name: "Create Image",
        link: "/create",
    },
    {
        icon: "theme-light-dark",
        name: "Retheme Image",
        link: "/retheme"
    },
    {
        icon: "qrcode",
        name: "QrCode",
        link: "/qrcode",
    }
]
</script>

<style scoped>
#logo {
    font-size: 8rem;
    width: 100%;
    color: var(--c-header);
    text-align: center;
    margin-top: 13rem;

    text-shadow: 3px 3px 10px black;
    transition: all 0.5s;
}

@media(max-width: 600px) {
    #logo {
        font-size: 4rem;
    }
}


@media(orientation: landscape) {
    #logo {
        margin-top: 0px;
    }
}

#ai {
    display: inline-block;
    color: var(--c-primary);
    rotate: 0deg;
    font-size: 1.2em;

    transition: all 0.8s;
}

#logo:hover #ai {
    margin-left: 20px;
    margin-right: 20px;

    background: linear-gradient(90deg, red, orange);
    background-clip: text;
    color: transparent;
    text-shadow: none;

    font-size: 1.5em;
    rotate: 370deg;

    animation: hue_shift 2s infinite linear;
}

@keyframes hue_shift {
    0% {
        filter: hue-rotate(0deg);
    }

    100% {
        filter: hue-rotate(360deg);
    }
}

#product_list {
    font-size: 4rem;
    text-align: center;

    transform: translateX(50px);
}

@media(max-width: 1000px) {
    #product_list {
        display: none;
    }
}

#typing {
    display: inline-block;
    height: 1em;
    width: 5px;
    background: var(--c-primary);

    animation: blink 1s step-start infinite;
    transform: translateX(-0.3em);
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

#list {
    background-color: var(--color-background);
    text-align: left;
    display: inline-block;

    border-radius: 20px;
    border: solid 5px rgb(130, 130, 200);
    box-shadow: 15px 10px 30px black;

    overflow: hidden;
    transform: translateX(150px);
}

.item {
    font-size: 3rem;
    border-bottom: solid gray;

    color: var(--c-primary);
    padding: 10px;

    transition: all 1s;
}

.item:last-child {
    border-bottom: none;
}

.item:hover {
    text-decoration: underline;
}
</style>
