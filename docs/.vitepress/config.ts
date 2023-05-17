import { defineConfig } from 'vitepress'
import { nav } from './configs'
import head from './configs/head'
import siderbars from './configs/sidebar'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Bole UI',
  lang: 'zh-CN',
  description: 'A VitePress Site',
  head,
  themeConfig: {
    nav,
    siderbars
  }
})

export default config
