import path, { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import Comp from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import markdownTransform from './.vitepress/plugins/markdownTransform'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export default defineConfig(() => {
  return {
    plugins: [
      Comp({
        dirs: ['.vitepress/vitepress/components'],
        allowOverrides: true,
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      vueJsx(),
      DefineOptions(),
      markdownTransform(),
    ],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, '')}/`,
      },
    },
    optimizeDeps: {
      include: [
        '@panda-ui/icons',
        ...Object.keys(pkg.dependencies).filter((dep: string) => !dep.includes('panda-ui')),
      ],
    },
    build: {
      // sourcemap: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 10 * 1024,
    },
    server: {
      host: true,
    },
  }
})
