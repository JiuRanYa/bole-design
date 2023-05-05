import { createApp } from 'vue'
import '@bole-design/styles'
import { install } from '@bole-design/components'

const app = Promise.all([import(`./router/port-${__PORT__}.ts`), import('./App.vue')]).then(
  ([{ router }, { default: App }]) => {
    createApp(App)
      .use(install, {
        props: {
          default: {
            size: 'large'
          }
        },
        prefix: 'bl'
      })
      .use(router)
      .mount('#app')
  }
)
