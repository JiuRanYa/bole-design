// https://vitepress.dev/guide/custom-theme
import Layout, { globals } from '../vitepress'
import './style.css'
import { install } from '@bole-design/components'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.use(install, {
      default: { transfer: '#transfer-place' }
    })

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  }
}
