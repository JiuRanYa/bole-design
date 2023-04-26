import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const demos = process.env.DEMOS
const port = parseInt(process.env.PORT || '') || 8008

export default defineConfig(() => {
  return {
    plugins: [vue()],
    define: {
      __DEMOS__: demos,
      __PORT__: JSON.stringify(port),
    },
    server: {
      port,
    },
  }
})
