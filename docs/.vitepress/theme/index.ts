// https://vitepress.dev/guide/custom-theme
import { install } from '@panda-ui/components'
import { globals } from '../vitepress'
import Layout from '../vitepress/components/bl-app.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.use(install, {
      default: { transfer: '#transfer-place' },
      props: {
        'filter': {
          to: 'body',
        },
        'date-picker': {
          to: 'body',
        },
        'tooltip': {
          transfer: 'body',
        },
      },
    })

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
