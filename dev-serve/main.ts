import { createApp } from 'vue'
import '@bole-design/styles'

const app = Promise.all([
  import(`./router/port-${__PORT__}.ts`),
  import('./App.vue'),
]).then(([{ router }, { default: App }]) => {
  createApp(App).use(router).mount('#app')
})
