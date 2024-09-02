import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitest/config'
import DefineOptions from 'unplugin-vue-define-options/vite'

const rootDir = __dirname

export default defineConfig({
  root: rootDir,
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
  },
  plugins: [Vue(), VueJsx(), DefineOptions()],
})
