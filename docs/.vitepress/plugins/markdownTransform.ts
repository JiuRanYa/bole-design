import { basename } from 'node:path'
import type { Plugin } from 'vite'

export default function markdownTransform(): Plugin {
  return {
    name: 'bl-markdown-imports',

    enforce: 'pre',

    async transform(code: string, id: string) {
      if (!/[\\/]components[\\/].+\.md$/.test(id))
        return

      const component = basename(id, '.md')
      const scriptSetups = [
        `const demos = import.meta.glob('../../../demos/panda-ui/${component}/**/*.vue', { eager: true, import: 'default' })`,
      ]

      return combineMarkdown(code, [`\n<script setup>\n${scriptSetups.join('\n')}\n</script>\n`])
    },
  }
}

function combineMarkdown(code: string, headers: string[] = [], footers: string[] = []) {
  if (headers.length) {
    const frontmatterEnd = code.indexOf('---\n\n') + 4
    const firstHeader = code.search(/^#\s.+/) & code.search(/\n#+\s.+/)
    const sliceIndex = firstHeader < 0 ? frontmatterEnd : firstHeader

    code = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  }

  return `${code + footers.join('\n')}\n`
}
