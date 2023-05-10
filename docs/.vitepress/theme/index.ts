// https://vitepress.dev/guide/custom-theme
import Layout from '../vitepress'
import './style.css'
import { install } from '@bole-design/components'
import { PROJEACT } from '../vitepress/composables/const'
import { getProject } from '../configs/project'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    const proj = getProject()
    app.use(install)
    app.provide(PROJEACT, proj)
  }
}
