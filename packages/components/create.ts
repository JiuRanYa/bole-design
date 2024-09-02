import type { App } from 'vue'
import type { IconsOptions, MaybeRef } from '@panda-ui/common'
import { configIcons, configProps, configZIndex, isNumber, toCapitalCase } from '@panda-ui/common'
import type { PropsOptions } from './props'

export interface InstallConfig {
  props?: PropsOptions
  prefix?: string
  zIndex?: number
  icons?: MaybeRef<IconsOptions>
}

export function buildInstall(components: any[] = []) {
  return function install(app: App, options: InstallConfig = {}) {
    const { props = {}, prefix = '', zIndex = 2000, icons = {} } = options

    configProps(props, app)
    configIcons(icons, app)

    if (isNumber(zIndex))
      configZIndex(zIndex, app)

    const normallizedPrefix = toCapitalCase(prefix || '')

    components.forEach((component) => {
      if (typeof component === 'function' || typeof component.install === 'function')
        app.use(component)
      else
        app.component(`${normallizedPrefix}${component.name}`, component)
    })
  }
}
