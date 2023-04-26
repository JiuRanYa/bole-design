import { logger, prettierConfig, queryIdlePort, rootDir, run } from './utils'
import minimist from 'minimist'
import { resolve } from 'node:path'
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import prompts from 'prompts'
import { format } from 'prettier'

const args = minimist<{
  l?: string
  port?: string
  lang?: string
  prodMode?: string
}>(process.argv.slice(2))

const argPort = args.port || '8008'
const langs = ['zh-CN', 'en-US']
const lang = args.lang || args.l
const prodMode = args.prod

let port = parseFloat(argPort) || 8008

const devDir = resolve(rootDir, 'dev-serve')

async function main() {
  port = await queryIdlePort(port)

  await serveComponent()
}

async function serveComponent() {
  const demosDir = resolve(rootDir, 'docs/demos')
  const allComponents = readdirSync(demosDir).filter((f) =>
    statSync(resolve(demosDir, f)).isDirectory()
  )

  const target = await selectComponent(allComponents)

  const matchedLang = lang
    ? langs.find((l) => l === lang || l.startsWith(lang)) || 'zh-CN'
    : 'zh-CN'

  const demos = queryDemoFile(target, matchedLang)

  const router = `
    import { createRouter, createWebHistory } from 'vue-router'

    document.title = '${target} | Bole Design'

    export const router = createRouter({
      history: createWebHistory('/'),
      routes: [
        ${demos
          .map((demo, index) => {
            return `{
              path: '${index ? `/${demo}` : '/'}',
              name: '${demo}',
              component: () => import('../../docs/demos/${target}/${demo}/demo.${matchedLang}.vue')
            }`
          })
          .join(',\n')},
          {
            path: '/:catchAll(.*)',
            redirect: '/'
          }
      ]
    })

    router.afterEach(to => {
      document.title = \`${target} - \${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design\`
    })
  `

  writeFileSync(
    resolve(devDir, 'router', `port-${port}.ts`),
    format(router, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await run('pnpm', ['serve'], {
    cwd: devDir,
    stdio: 'inherit',
    env: {
      NODE_ENV: prodMode ? 'production' : 'development',
      TARGET: target,
      DEMOS: JSON.stringify(demos),
      PORT: `${port}`,
    },
  })
}

async function selectComponent(allComponents: string[]) {
  const component = (
    await prompts({
      type: 'select',
      name: 'component',
      message: 'Select a component:',
      choices: allComponents.map((comp) => ({
        title: comp,
        value: comp,
      })),
    })
  ).component

  return component
}

function queryDemoFile(component: string, lang: string) {
  const compDir = resolve(rootDir, 'docs/demos', component)

  return readdirSync(compDir).filter(
    (f) =>
      statSync(resolve(compDir, f)).isDirectory() &&
      existsSync(resolve(compDir, f, `demo.${lang}.vue`))
  )
}

main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
