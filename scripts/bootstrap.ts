import { resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import {
  rootDir,
  prettierConfig,
  logger,
  hooks as allHooks,
  components as allComponents,
  toCapitalCase
} from './utils'

const ignores: any[] = []
const plugins: any[] = []

async function main() {
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))

  const index = `
    ${exportComponents
      .map(component => `import { ${toCapitalCase(component)} } from './${component}'`)
      .join('\n')}

    import { buildInstall } from './create'

    const components = [
      ${components.map(toCapitalCase).join(',\n')},
    ]

    export const install = buildInstall(components)

    ${allComponents.map(component => `export * from './${component}'`).join('\n')}
  `

  const hooksIndex = `
    ${allHooks.map(hook => `import { ${hook} } from './${hook}'`).join('\n')}

    ${allHooks.map(hook => `export * from './${hook}'`).join('\n')}
  `

  const types = `
    // GlobalComponents for Volar
    declare module '@vue/runtime-core' {
      export interface GlobalComponents {
        ${[...components]
          .map(
            name => `${toCapitalCase(name)}: typeof import('bole-design')['${toCapitalCase(name)}']`
          )
          .join(',\n')}
      }

      interface ComponentCustomProperties {
        ${plugins
          .map(name => `$${name}: typeof import('bole-design')['${toCapitalCase(name)}']`)
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
    'utf-8'
  )
  await writeFile(
    hookIndexPath,
    prettier.format(hooksIndex, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )
  await writeFile(
    typesPath,
    prettier.format(types, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await ESLint.outputFixes(await eslint.lintFiles(indexPath))
  await ESLint.outputFixes(await eslint.lintFiles(typesPath))

  // await runParallel(cpus().length, allComponents, async (component) => {
  //   const scssPath = resolve(rootDir, `style/${component}.scss`);
  //
  //   if (!existsSync(scssPath)) {
  //     await writeFile(scssPath, "", "utf-8");
  //   }
  // });
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
