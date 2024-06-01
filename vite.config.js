// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import laravel from 'laravel-vite-plugin';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     laravel(['src/main.js']),
//   ],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `
//           @import "./src/styles/app.scss";
//         `
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   build: {
//     outDir: 'build',
//     manifest: true,
//     target: 'es2020'
//     // minify: false,
//   },
// })

// import { fileURLToPath, URL } from 'node:url';
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import laravel from 'laravel-vite-plugin';

// export default defineConfig({
//   plugins: [
//     vue(),
//     laravel({
//       input: 'src/main.js',
//       refresh: true,
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
//   build: {
//     outDir: 'build',
//     manifest: true,
//     target: 'es2020',
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `
//           @import "./src/styles/app.scss";
//         `,
//       },
//     },
//   },
// });

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/app.scss";
        `
      },
    },
  },
  plugins: [
    laravel({
      input: 'src/main.js',
      refresh: true,
    }),
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    outDir: 'build',
    manifest: true,
    target: 'es2020'
    // minify: false,
  },
  publicDir: 'public',
})
