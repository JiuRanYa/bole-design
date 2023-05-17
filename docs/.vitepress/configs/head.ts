import fs from 'fs'
import path from 'path'
import type { HeadConfig } from 'vitepress'
import { vpRoot } from '@bole-design/internal'

const head: HeadConfig[] = [
  ['script', {}, fs.readFileSync(path.resolve(vpRoot, './project.js'), 'utf-8')]
]

export default head
