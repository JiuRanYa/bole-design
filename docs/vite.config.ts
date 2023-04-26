import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    plugins: [vue()],
    resolve: {
      alias: [{ find: /^@docs\/(.+)/, replacement: resolve(__dirname, '$1') }],
    },
  }
})
