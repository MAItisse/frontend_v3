import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(mdiVue, {
    icons: mdijs
})

app.mount('#app')
