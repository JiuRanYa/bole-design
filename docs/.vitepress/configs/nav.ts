import { computed } from 'vue'

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
function getNav() {}

export const nav = getNav()
