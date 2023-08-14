import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        scss: {
            includePaths: [
                'src'
            ]
        }
    }),
    kit: {
        adapter: adapter(),
        inlineStyleThreshold: 1024 * 5, // 1kb * X
        version: {
            name: Date.now().toString(),
            pollInterval: 1000 * 10,
        },
        alias: {
            '@lib': path.resolve('./src/lib'),
            '@stores': path.resolve('./src/stores'),
        },
    }
}

export default config
