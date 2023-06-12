import prompts from 'prompts'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import { logger, prettierConfig, run, toCapitalCase } from './utils'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const comp = await prompts({
    type: 'text',
    name: 'name',
    message: 'Please input your component name: '
  })

  const compName = toCapitalCase(comp.name)

  const confirm = await prompts({
    type: 'confirm',
    name: 'create',
    message: `Are you sure you want to create ${compName} component?`
  })

  if (!confirm.create) return

  const demoTemp = `
  		<template>
  			<${compName} />
  		</template>
  	`
  const demoRoot = resolve('docs/demos/bole-design')
  const demoPath = resolve('docs/demos/bole-design', comp.name, 'basic')

  const markdownTemp = `
---
title: Button
lang: zh-CN
---

# ${compName}

<script setup>
const demos = import.meta.globEager('../../../demos/bole-design/${comp.name}/*/*.vue')
</script>
  	`
  const markdownPath = resolve('docs/projects/bole-design/components')

  const componentPath = resolve(`packages/components/${comp.name}`)
  const componentIndexTemp = `
		import ${compName} from './${comp.name}.vue'

		export { ${compName} }
	`
  const componentVueTemp = `
		<template>
			<div>${compName}</div>
		</template>

		<script setup lang="ts">
		defineOptions({
			name: '${compName}'
		})
		</script>
	`

  await mkdir(componentPath, { recursive: true })
  await mkdir(resolve(demoRoot, comp.name, 'basic'), { recursive: true })

  await writeFile(
    resolve(demoPath, 'index.vue'),
    prettier.format(demoTemp, { ...prettierConfig, parser: 'vue' }),
    'utf-8'
  )

  logger.success(`Demo file created `)

  await writeFile(
    resolve(markdownPath, `${comp.name}.md`),
    prettier.format(markdownTemp, { ...prettierConfig, parser: 'markdown' }),
    'utf-8'
  )

  logger.success(`Init ${compName} component docs`)

  await writeFile(
    resolve(componentPath, 'index.ts'),
    prettier.format(componentIndexTemp, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await writeFile(
    resolve(componentPath, `${comp.name}.vue`),
    prettier.format(componentVueTemp, { ...prettierConfig, parser: 'vue' }),
    'utf-8'
  )

  logger.success(`Generate ${compName} template`)

  const eslint = new ESLint({ fix: true })
  await ESLint.outputFixes(await eslint.lintFiles(resolve(demoPath, 'index.vue')))
  await ESLint.outputFixes(await eslint.lintFiles(resolve(markdownPath, `${comp.name}.md`)))
  await ESLint.outputFixes(await eslint.lintFiles(resolve(componentPath, 'index.ts')))
  await ESLint.outputFixes(await eslint.lintFiles(resolve(componentPath, `${comp.name}.vue`)))

  await run('pnpm', ['bootstrap'])
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
