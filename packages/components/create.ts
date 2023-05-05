import type { App } from 'vue'
import type { LocalConfig } from '@bole-design/common'
import { configProps } from '@bole-design/common'
import { PropsOptions } from './props'

interface InstallConfig {
  props?: PropsOptions
}

export function buildInstall(components: any[] = [], LocalConfig?: LocalConfig) {
  return function install(app: App, options: InstallConfig) {
    const { props = {} } = options

    configProps(props, app)

    components.forEach(component => {
      if (typeof component === 'function' || typeof component.install === 'function') {
        app.use(component)
      } else {
        console.log(component.name, component)
        app.component(`${component.name}`, component)
      }
    })
  }
}
