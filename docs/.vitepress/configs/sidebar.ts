import { SidebarItem } from '../vitepress/composables/sidebar'
import { getProject } from './project'

export const siderbarsConfig: SidebarsConfig = {
  'bole-design': {
    guide: [
      {
        text: '指南',
        children: [
          { text: '设计', link: '/guide/design' },
          { text: '快速安装', link: '/guide/installation' },
          { text: '快速上手', link: '/guide/quick-start' },
          { text: '全局配置', link: '/guide/global-config' }
        ]
      }
    ],
    components: [
      {
        text: '组件',
        children: [{ text: '按钮', link: '/components/button' }]
      }
    ]
  },
  panda: {}
}

type SideConfigItem = {
  text: string
  children: ConfigItem[]
}
type ConfigItem = {
  text: string
  link: string
}

type SidebarsConfig = Record<string, Record<string, SideConfigItem[]>>

export const getSidebars = () => {
  const project = getProject()

  const defaultSiderbars = siderbarsConfig[project]

  const sidebars: typeof defaultSiderbars = JSON.parse(JSON.stringify(defaultSiderbars))

  for (const dir in sidebars) {
    const items = sidebars[dir]
    const prefix = `/projects/${project}`

    items.forEach(item => {
      const children = item.children
      if (children) {
        children.forEach(child => {
          child.link = `${prefix}${child.link}`
        })
      }
    })
  }

  return sidebars
}

const sidebars = getSidebars()

export default sidebars
