import type { Plugin } from 'vite'
import path from 'path'

export default function markdownTransform(): Plugin {
  return {
    name: 'bl-markdown-transform',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) return

      const componentId = path.basename(id, '.id')

      // console.log(code, id)
    }
  }
}
