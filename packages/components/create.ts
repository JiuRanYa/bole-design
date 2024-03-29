import type { App } from 'vue'
import { LocalConfig, toCapitalCase } from '@panda-ui/common'
import { configProps } from '@panda-ui/common'
import { PropsOptions } from './props'

export interface InstallConfig {
  props?: PropsOptions
  prefix?: string
}

export function buildInstall(components: any[] = [], LocalConfig?: LocalConfig) {
  return function install(app: App, options: InstallConfig = {}) {
    const { props = {}, prefix = '' } = options

    configProps(props, app)

    const normallizedPrefix = toCapitalCase(prefix || '')

    components.forEach(component => {
      if (typeof component === 'function' || typeof component.install === 'function') {
        app.use(component)
      } else {
        app.component(`${normallizedPrefix}${component.name}`, component)
      }
    })
  }
}
