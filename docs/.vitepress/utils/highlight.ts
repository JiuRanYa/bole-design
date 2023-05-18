import { getHighlighter } from 'shiki'

const highlighter = await getHighlighter({
  themes: ['material-theme-palenight'],
  langs: ['javascript', 'vue']
})

export const highlight = (str: string) => {
  str = highlighter.codeToHtml(str, { lang: 'vue' })
  return str
}
