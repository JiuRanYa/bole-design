// https://vitepress.dev/guide/custom-theme
import Layout, { globals } from '../vitepress'
import './style.css'
import { install } from '@bole-design/components'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.use(install)

    globals.forEach(([name, Comp]) => {
      console.log(name, Comp)
      app.component(name, Comp)
    })
  }
}
