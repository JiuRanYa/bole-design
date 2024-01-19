import path from 'node:path'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import { readdirSync, statSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { iconDir, logger, prettierConfig } from './utils'

async function main() {
  const iconMap = await geneIconMap()
  const iconTemp = `
		${JSON.stringify(iconMap)}
	`
  const eslint = new ESLint({ fix: true })
  const iconPath = 'docs/iconCategory.json'

  await writeFile(
    iconPath,
    prettier.format(iconTemp, { ...prettierConfig, parser: 'json' }),
    'utf-8'
  )

  await ESLint.outputFixes(await eslint.lintFiles(iconPath))
}

async function readFileAsync(filePath: string) {
  const data = await readFile(filePath, 'utf8')
  return data
}
async function geneIconMap() {
  const result: any = {}

  const traverseFileTree = async (directory: string, parentDir = '') => {
    const files = readdirSync(directory)

    for (const file of files) {
      const filePath = path.join(directory, file)
      const fileStats = statSync(filePath)

      if (!fileStats.isDirectory()) {
        if (Array.isArray(result[parentDir])) {
          const svgFile = await readFileAsync(filePath)
          result[parentDir].push({
            name: file,
            show_svg: svgFile
          })
        } else {
          result[parentDir] = []
        }
      } else {
        await traverseFileTree(filePath, path.join(parentDir, file))
      }
    }
  }

  await traverseFileTree(iconDir)

  return result
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
