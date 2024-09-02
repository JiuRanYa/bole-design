import { createApp } from 'vue'
import '@panda-ui/styles'
import { install } from '@panda-ui/components'
import './style.scss'

const app = Promise.all([import(`./router/port-${__PORT__}.ts`), import('./App.vue')]).then(
  ([{ router }, { default: App }]) => {
    createApp(App).use(install).use(router).mount('#app')
  },
)
