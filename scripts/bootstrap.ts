import { resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import {
  components as allComponents,
  hooks as allHooks,
  logger,
  prettierConfig,
  rootDir,
  toCapitalCase,
} from './utils'

const ignores: any[] = []
const plugins: any[] = []

async function main() {
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))
  logger.info('Start bootstrap for components...')

  const index = `
    ${exportComponents
      .map(component => `import { ${toCapitalCase(component)} } from './${component}'`)
      .join('\n')}

    import { buildInstall } from './create'

    export * from './create'

    const components = [
      ${components.map(toCapitalCase).join(',\n')},
    ]

    export const install = buildInstall(components)

    ${allComponents.map(component => `export * from './${component}'`).join('\n')}
  `

  const hooksIndex = `
    ${allHooks.map(hook => `export * from './${hook}'`).join('\n')}
  `

  const types = `
    // GlobalComponents for Volar
    declare module '@vue/runtime-core' {
      export interface GlobalComponents {
        ${[...components]
          .map(
            name => `${toCapitalCase(name)}: typeof import('panda-ui')['${toCapitalCase(name)}']`,
          )
          .join(',\n')}
      }

      interface ComponentCustomProperties {
        ${plugins
          .map(name => `$${name}: typeof import('panda-ui')['${toCapitalCase(name)}']`)
          .join(',\n')}
      }
    }

    export {}
  `

  const eslint = new ESLint({ fix: true })
  const hookIndexPath = resolve(rootDir, 'packages/hooks/index.ts')
  const indexPath = resolve(rootDir, 'packages/components/index.ts')
  const typesPath = resolve(rootDir, 'types.d.ts')

  await writeFile(
    indexPath,
    prettier.format(index, { ...prettierConfig, parser: 'typescript' }),
    'utf-8',
  )
  await writeFile(
    hookIndexPath,
    prettier.format(hooksIndex, { ...prettierConfig, parser: 'typescript' }),
    'utf-8',
  )
  await writeFile(
    typesPath,
    prettier.format(types, { ...prettierConfig, parser: 'typescript' }),
    'utf-8',
  )

  await ESLint.outputFixes(await eslint.lintFiles(indexPath))
  await ESLint.outputFixes(await eslint.lintFiles(typesPath))

  logger.success('Bootstrap for components success')

  // 目前不需要自动生成样式文件
  // await runParallel(cpus().length, allComponents, async (component) => {
  //   const scssPath = resolve(rootDir, `style/${component}.scss`);
  //
  //   if (!existsSync(scssPath)) {
  //     await writeFile(scssPath, "", "utf-8");
  //   }
  // });
}

main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
