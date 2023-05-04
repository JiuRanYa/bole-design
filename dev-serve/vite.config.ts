import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Comp from 'unplugin-vue-components/vite'
import { resolve } from 'node:path'
import { readdirSync, statSync, existsSync } from 'node:fs'

const demos = process.env.DEMOS
const port = parseInt(process.env.PORT || '') || 8008

const componentsDir = resolve(__dirname, '../packages/components')
const components = readdirSync(componentsDir).filter((f) => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      Comp({
        dts: false,
        resolvers: [
          {
            type: 'component',
            resolve: (name) => {
              const kebabName = toKebabCase(name)

              if (components.includes(kebabName)) {
                return {
                  name,
                  from: `@bole-design/components/${kebabName}/index.ts`,
                }
              }
            },
          },
        ],
      }),
    ],
    define: {
      __DEMOS__: demos,
      __PORT__: JSON.stringify(port),
    },
    server: {
      port,
    },
  }
})

function toKebabCase(value: string) {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}
