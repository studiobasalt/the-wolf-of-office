import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import svg from '@poppanator/sveltekit-svg'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        imagetools(),
        svg({
            svgoOptions: {
                multipass: true,
            },
        }),
        sveltekit(),
    ],
})
