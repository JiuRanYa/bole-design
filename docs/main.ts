import { createApp } from 'vue'
import { install } from '@bole-design/components'
import './.vitepress/vitepress/styles/app.scss'
import App from './App.vue'
import { router } from './router/index'

const app = createApp(App)

app.use(install)
app.use(router)

app.mount('#app')
