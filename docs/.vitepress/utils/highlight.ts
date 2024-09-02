import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['slack-dark'],
  langs: ['javascript', 'vue'],
})

export function highlight(str: string) {
  str = highlighter.codeToHtml(str, { lang: 'vue', theme: 'slack-dark' })
  return str
}
