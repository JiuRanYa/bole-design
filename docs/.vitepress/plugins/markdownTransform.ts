import type { Plugin } from 'vite'

export default function markdownTransform(): Plugin {
  return {
    name: 'bl-markdown-transform',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) return

      // TODO: add append
    }
  }
}
