import { defineConfig } from 'vitepress'
import { nav } from './configs'
import { project } from './configs/project'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: 'Bole UI',
  lang: 'zh-CN',
  description: 'A VitePress Site',
  themeConfig: {
    nav,
    project: project
  }
})

export default config
