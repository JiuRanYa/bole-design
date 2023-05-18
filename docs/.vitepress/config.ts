import { defineConfig } from 'vitepress'
import { nav } from './configs'
import head from './configs/head'
import sidebars from './configs/sidebar'
import { markdownPlugin } from './configs/myMarkdown'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Bole UI',
  lang: 'zh-CN',
  description: 'A VitePress Site',
  head,
  themeConfig: {
    nav,
    sidebars,
    docsDir: 'docs'
  },
  markdown: {
    config: md => markdownPlugin(md)
  }
})

export default config
