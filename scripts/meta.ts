import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { components as allComponents, logger, publicDir, toCapitalCase } from './utils'

export const outputDir = resolve(publicDir, '')

async function main() {
  if (!existsSync(outputDir))
    mkdirSync(outputDir, { recursive: true })

  const ignores = ['typography']
  const exportComponents = allComponents.filter(c => !ignores.includes(c))

  const metaData = `
{
  "components": [
    ${exportComponents.map(name => `"${toCapitalCase(name)}"`).join(',\n')}
  ]
}
`
  await writeFile(
    resolve(outputDir, 'components.json'),
    JSON.stringify(JSON.parse(metaData)),
    'utf-8',
  )
  logger.success('Generate meta data successfully')
}
main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
