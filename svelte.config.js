import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

// This config is ignored and replaced with one of the configs in the shared folder when a project is created.

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build/kiosk-ui',
      assets: 'build/kiosk-ui'
    }),
    files: {
      assets: 'src/kiosk-ui/static',
      routes: 'src/kiosk-ui/src/routes',
      appTemplate: 'src/kiosk-ui/src/app.html',
      lib: 'src/kiosk-ui/src/lib'
    }
  },
  preprocess: preprocess()
};

export default config;
