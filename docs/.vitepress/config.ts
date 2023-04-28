import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Bole UI',
  lang: 'zh-CN',
  description: 'A VitePress Site',
  themeConfig: {
    repo: '../../docs',
  },
})

export default config
