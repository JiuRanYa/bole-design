import { defineConfig } from 'vitepress'
import { nav } from './configs'
import head from './configs/head'
import sidebars from './configs/sidebar'
import { markdownPlugin } from './configs/myMarkdown'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Panda UI',
  lang: 'zh-CN',
  description: '高度可定制化，全量 Typescript 支持，面向开发者的工具集',
  head,
  lastUpdated: true,
  themeConfig: {},
  markdown: {
    headers: {
      level: [1, 2, 3]
    },
    config: md => markdownPlugin(md)
  }
})

export default config
