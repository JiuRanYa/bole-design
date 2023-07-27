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
          { text: '全局配置', link: '/guide/global-config' },
          { text: '样式配置', link: '/guide/style-config' }
        ]
      }
    ],
    components: [
      {
        text: '基础组件',
        children: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Icon 图标', link: '/components/icon' }
        ]
      },
      {
        text: '布局组件',
        children: [{ text: 'Row 行', link: '/components/row' }]
      },
      {
        text: '数据录入',
        children: [
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'DatePicker 日期选择器', link: '/components/date-picker' }
        ]
      },
      {
        text: '通知组件',
        children: [
          { text: 'Tooltip 提示', link: '/components/tooltip' },
          { text: 'Popover 气泡', link: '/components/popover' }
        ]
      }
    ],
    hooks: [
      {
        text: 'Hooks',
        children: [
          { text: 'usePopper', link: '/hooks/usePopper' },
          { text: 'useClickOutside', link: '/hooks/useClickOutside' }
        ]
      }
    ],
    cdn: [
      {
        text: '图标库',
        children: [
          { text: '指南', link: '/cdn/icon' },
          { text: 'Brands', link: '/cdn/brands' }
        ]
      }
    ],
    contribute: [
      {
        text: '开发',
        children: [
          { text: '启动项目', link: '/contribute/start' },
          { text: '开发命令', link: '/contribute/server' }
        ]
      }
    ]
  },
  panda: {
    guide: [
      {
        text: '指南',
        children: [{ text: '设计', link: '/guide/index' }]
      }
    ]
  }
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
  // TODO: not use project, return all sidebars
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
