import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    resolve: {
      alias: [
        {
          find: /^bole-design$/,
          replacement: resolve(__dirname, '../packages'),
        },
      ],
    },
  }
})
