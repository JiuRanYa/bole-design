import { createApp } from 'vue'

const app = Promise.all([
  import(`./router/port-${__PORT__}.ts`),
  import('./App.vue'),
]).then(([{ router }, { default: App }]) => {
  createApp(App).use(router).mount('#app')
})
