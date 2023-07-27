import path from 'node:path'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import { readdirSync, statSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { iconDir, logger, prettierConfig } from '../../scripts/utils'

async function main() {
  const iconMap = geneIconMap()
  const iconTemp = `
		const iconMap = ${JSON.stringify(iconMap)}
		export default iconMap
	`
  const eslint = new ESLint({ fix: true })
  const iconPath = 'docs/iconMap.ts'

  await writeFile(
    iconPath,
    prettier.format(iconTemp, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await ESLint.outputFixes(await eslint.lintFiles(iconPath))
}

function geneIconMap() {
  const result: any = {}

  const traverseFileTree = (directory: string, parentDir = '') => {
    const files = readdirSync(directory)

    for (const file of files) {
      const filePath = path.join(directory, file)
      const fileStats = statSync(filePath)

      if (!fileStats.isDirectory()) {
        if (Array.isArray(result[parentDir])) {
          result[parentDir].push(file)
        } else {
          result[parentDir] = []
        }
      } else {
        traverseFileTree(filePath, path.join(parentDir, file))
      }
    }
  }

  traverseFileTree(iconDir)

  return result
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
