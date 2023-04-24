import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

export const projRoot = resolve(__dirname, '../../')
export const pkgRoot = resolve(projRoot, 'packages')
export const blRoot = resolve(pkgRoot, 'bole-design')
export const buildOutput = resolve(projRoot, 'dist')
export const blOutput = resolve(buildOutput, 'bole-design')

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}
