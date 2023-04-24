import { resolve } from 'node:path'

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
