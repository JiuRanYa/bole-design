import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'

const localMd = MarkdownIt()

const demoRex = /^demo\s*(.*)$/

export const markdownPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate: function (params) {
      return !!params.trim().match(demoRex)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(demoRex)

      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''

        console.log(description)

        return `<Demo :demos="demos" desc="${localMd.render(encodeURIComponent(description))} "/>`
      }
    }
  })
}
