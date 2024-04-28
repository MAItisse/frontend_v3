import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import { Vue3Mq } from "vue3-mq";


const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VueLazyload, {
    loading: "/loading.gif"
});
app.use(mdiVue, {
    icons: mdijs
})
app.use(Vue3Mq, {});

app.mount('#app')
