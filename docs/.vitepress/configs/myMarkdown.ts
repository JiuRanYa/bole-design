import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token'
import { docRoot } from '@panda-ui/internal'
import { highlight } from '../utils/highlight'

const localMd = MarkdownIt()

const demoRex = /^demo\s*(.*)$/

export function markdownPlugin(md: MarkdownIt) {
  md.use(mdContainer, 'demo', {
    validate(params: string) {
      return !!params.trim().match(demoRex)
    },

    render(tokens: Token[], idx: number, t: any, env: any) {
      const m = tokens[idx].info.trim().match(demoRex)
      const sourceFileToken = tokens[idx + 2]
      // const mdPath = env.path
      // const project = mdPath.split('projects')[2].split('/')[1]
      const project = 'panda-ui'

      if (!project)
        throw new Error(`Mark sure to put your md in projects path`)

      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFilePath = sourceFileToken?.children?.[0].content ?? ''

        let code = ''

        if (sourceFileToken?.type === 'inline') {
          code = fs.readFileSync(
            path.resolve(docRoot, `demos/${project}`, `${sourceFilePath}`, 'index.vue'),
            'utf-8',
          )
        }

        code = highlight(code)

        return `<Demo 
					:demos="demos"
					desc="${encodeURIComponent(localMd.render(description))}"
					path="${sourceFilePath}"
					source="${encodeURIComponent(code)}"
				>`
      }
      else {
        return '</Demo>'
      }
    },
  })
}
