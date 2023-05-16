import { defineConfig } from 'vitepress'
import { nav } from './configs'
import head from './configs/head'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Bole UI',
  lang: 'zh-CN',
  description: 'A VitePress Site',
  head,
  themeConfig: {
    nav
  }
})

export default config
