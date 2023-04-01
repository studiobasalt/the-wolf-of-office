import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 3000
  },
  alias: {
    $lib: '/src/kiosk-ui/src/lib'
  }
});
