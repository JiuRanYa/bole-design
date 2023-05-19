import './styles/vars/css-vars.scss'
import './styles/app.scss'
import type { Component } from 'vue'

import BLDemo from './components/bl-demo.vue'
import BLApp from './components/bl-app.vue'

export default BLApp
export const globals: [string, Component][] = [['Demo', BLDemo]]
