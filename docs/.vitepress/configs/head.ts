import fs from 'fs'
import path, { resolve } from 'path'
import type { HeadConfig } from 'vitepress'

const blRoot = resolve(__dirname, '../../.vitepress')

const head: HeadConfig[] = [
  ['script', {}, fs.readFileSync(path.resolve(blRoot, 'project.js'), 'utf-8')]
]

export default head
