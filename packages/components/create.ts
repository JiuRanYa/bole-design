import type { App } from 'vue'

export function buildInstall(components: any[] = []) {
  return function install(app: App) {
    components.forEach((component) => {
      if (
        typeof component === 'function' ||
        typeof component.install === 'function'
      ) {
        app.use(component)
      } else {
        app.component(`${component.name}`, component)
      }
    })
  }
}
