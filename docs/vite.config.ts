import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    resolve: {
      alias: [{ find: /^@docs\/(.+)/, replacement: resolve(__dirname, '$1') }],
    },
  }
})
