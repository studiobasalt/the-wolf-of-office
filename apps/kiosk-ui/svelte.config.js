import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const scssPath = dirname(fileURLToPath(import.meta.url)) + '/src/scss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        scss: {
            includePaths: [
                'src'
            ],
            // prependData: `
            //     @import '${scssPath}/variables.scss';
            //     @import '${scssPath}/mixins.scss';
            // `,
        }
    }),
    kit: {
        adapter: adapter(),
        inlineStyleThreshold: 1024 * 5, // 1kb * X
        version: {
            name: Date.now().toString(),
        },
        alias: {
            '@lib': path.resolve('./src/lib'),
            '@stores': path.resolve('./src/stores'),
        },
    }
}

export default config
