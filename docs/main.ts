import { createApp } from 'vue'
import { install } from '@bole-design/components'
import App from './.vitepress/vitepress/components/bl-app.vue'

const app = createApp(App)

app.use(install)

app.mount('#app')
