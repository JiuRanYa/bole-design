import { defineConfig } from 'vite'
import Comp from 'unplugin-vue-components/vite'
import markdownTransform from './.vitepress/plugins/markdownTransform'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import path from 'node:path'

export default defineConfig(() => {
  return {
    plugins: [
      Comp({
        dirs: ['.vitepress/vitepress/components'],

        allowOverrides: true,

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
      }),
      vueJsx(),
      DefineOptions(),
      markdownTransform()
    ],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, '')}/`
      }
    },
    server: {
      host: true
    }
  }
})
