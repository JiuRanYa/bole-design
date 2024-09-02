import { defineConfig } from 'vitepress'
import head from './configs/head'
import { markdownPlugin } from './configs/myMarkdown'

export const markdownTheme = 'andromeeda'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Panda UI',
  lang: 'zh-CN',
  description: '高度可定制化，全量 Typescript 支持，面向开发者的工具集',
  head,

  lastUpdated: true,
  // building called
  transformHead: ({ pageData }) => {
    pageData.frontmatter.head ??= []

    if (!pageData)
      return

    pageData.frontmatter.head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
    pageData.frontmatter.head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])

    return head
  },
  // dev called
  transformPageData(pageData) {
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head?.push([
      'meta',
      { property: 'og:title', content: pageData.frontmatter.title },
    ])
    pageData.frontmatter.head?.push([
      'meta',
      { property: 'og:description', content: pageData.frontmatter.description },
    ])
  },
  markdown: {
    headers: {
      level: [1, 2, 3],
    },
    theme: markdownTheme,
    config: md => markdownPlugin(md),
  },
})

export default config
