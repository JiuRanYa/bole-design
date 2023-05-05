import { defineConfig } from 'vitepress'
import { nav } from './configs'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Bole UI',
  lang: 'zh-CN',
  description: 'A VitePress Site',
  themeConfig: {
    nav
  }
})

export default config
