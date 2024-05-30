import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    laravel(['src/main.js']),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/app.scss";
        `
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'build',
    manifest: true,
    target: 'es2020'
    // minify: false,
  },
})
