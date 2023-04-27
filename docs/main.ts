import { createApp } from 'vue'
import { install } from '@bole-design/components'
import App from './App.vue'

const app = createApp(App)

app.use(install)

console.log(App, install)

app.mount('#app')
