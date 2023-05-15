import { computed } from 'vue'
import { getProject } from './project'

export const navs = {
  'bole-design': [
    {
      link: '/guide/design',
      text: '指南'
    },
    {
      link: '/components',
      text: '组件'
    }
  ],
  Panda: [
    {
      link: '/guide/design',
      text: '项目说明'
    },
    {
      link: '/components',
      text: '代码规范'
    }
  ]
}
function getNav() {
  const proj = getProject().value
  const dNav = [...navs[proj]]

  dNav.forEach(item => {
    item.link = `/projects/${proj}${item.link}`
  })

  return dNav
}

export const nav = getNav()
