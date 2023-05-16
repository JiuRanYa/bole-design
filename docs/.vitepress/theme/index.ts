// https://vitepress.dev/guide/custom-theme
import Layout from '../vitepress'
import './style.css'
import { install } from '@bole-design/components'
import { PROJEACT } from '../vitepress/composables/const'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.use(install)
  }
}
