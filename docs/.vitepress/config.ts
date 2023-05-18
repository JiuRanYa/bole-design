import { defineConfig } from 'vitepress'
import { nav } from './configs'
import head from './configs/head'
import sidebars from './configs/sidebar'
import { mdPlugin } from './plugins/myMarkdown'

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
  }
  // markdown: {
  //   config: md => mdPlugin(md)
  // }
})

export default config
