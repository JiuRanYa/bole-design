import { SidebarItem } from '../vitepress/composables/sidebar'
import { getProject } from './project'

type SideConfigItem = {
  text: string
  children: ConfigItem[]
}
type ConfigItem = {
  text: string
  link: string
}

type SidebarsConfig = Record<string, Record<string, SideConfigItem[]>>

export const siderbarsConfig: SidebarsConfig = {
  'bole-design': {
    guide: [
      {
        text: 'Guide',
        children: [{ text: 'Design', link: '/guide' }]
      }
    ]
  },
  panda: {}
}

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
