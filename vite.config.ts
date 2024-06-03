import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { templateCompilerOptions } from '@tresjs/core'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            ...templateCompilerOptions
        }),
        Components({
            dts: true,
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
})
