export const siderbarsConfig: SidebarsConfig = {
  'panda-ui': {
    guide: [
      {
        text: '指南',
        children: [
          { text: '设计', link: '/guide/design' },
          { text: '快速安装', link: '/guide/installation' },
          { text: '快速上手', link: '/guide/quick-start' },
          { text: '全局配置', link: '/guide/global-config' },
          { text: '样式配置', link: '/guide/style-config' },
          { text: '在Nuxt中使用', link: '/guide/nuxt-module' },
        ],
      },
    ],
    components: [
      {
        text: '资源组件',
        children: [{ text: 'Icon 图标', link: '/components/icon' }],
      },
      {
        text: '数据展示',
        children: [
          { text: 'Avatar 头像', link: '/components/avatar' },
          { text: 'Badge 徽章', link: '/components/badge' },
          { text: 'Card 卡片', link: '/components/card' },
          { text: 'Label 标题', link: '/components/label' },
          { text: 'Tag 标签', link: '/components/tag' },
        ],
      },
      {
        text: '布局组件',
        children: [
          { text: 'Row 行', link: '/components/row' },
          { text: 'Tabs 标签页 ', link: '/components/tabs' },
          { text: 'Panel 拖拽面板 ', link: '/components/panel-group' },
          { text: 'Scroll Area 滚动容器 ', link: '/components/scroll-area' },
        ],
      },
      {
        text: '数据录入',
        children: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Radio 单选框', link: '/components/radio' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Checkbox 复选框', link: '/components/checkbox' },
          { text: 'ContextMenu 菜单', link: '/components/context-menu' },
          { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          { text: 'Cascader 联级选择器', link: '/components/cascader' },
          { text: 'TimePicker 时间选择器', link: '/components/time-picker' },
          { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
          { text: 'EmojiPicker 表情选择器', link: '/components/emoji-picker' },
          { text: 'InputNumber 数字输入框', link: '/components/input-number' },
          { text: 'Filter 筛选器', link: '/components/filter' },
          { text: 'FilterGroup 筛选器组合', link: '/components/filter-group' },
        ],
      },
      {
        text: '通知组件',
        children: [
          { text: 'Tooltip 提示', link: '/components/tooltip' },
          // { text: 'Popover 气泡', link: '/components/popover' },
          { text: 'Modal 弹窗', link: '/components/modal' },
          { text: 'Sheet 抽屉', link: '/components/sheet' },
          { text: 'Message 消息', link: '/components/message' },
        ],
      },
      {
        text: '其他',
        children: [
          { text: 'Masker 遮罩', link: '/components/masker' },
          { text: 'Full Screen 遮罩', link: '/components/full-screen' },
        ],
      },
    ],
    hooks: [
      {
        text: '功能',
        children: [
          { text: 'usePopper', link: '/hooks/usePopper' },
        ],
      },
      {
        text: '事件',
        children: [
          { text: 'useHover', link: '/hooks/useHover' },
          { text: 'useClickOutside', link: '/hooks/useClickOutside' },
          { text: 'useEventListener', link: '/hooks/useEventListener' },
          { text: 'useSetTimeout', link: '/hooks/useSetTimeout' },
          { text: 'useResizeObserver', link: '/hooks/useResizeObserver' },
        ],
      },
    ],
    cdn: [
      {
        text: '图标库',
        children: [
          { text: '指南', link: '/cdn/icon' },
          { text: 'Solid', link: '/cdn/solid' },
          { text: 'Brands', link: '/cdn/brands' },
          { text: 'Regular', link: '/cdn/regular' },
          { text: 'Mixpanel', link: '/cdn/mixpanel' },
        ],
      },
    ],
    contribute: [
      {
        text: '开发',
        children: [
          { text: '启动项目', link: '/contribute/start' },
          { text: '开发命令', link: '/contribute/server' },
          { text: '新增图片', link: '/contribute/icon' },
        ],
      },
      {
        text: '项目设计',
        children: [
          { text: '指南', link: '/contribute/project/guide' },
          { text: '新增项目', link: '/contribute/project/new' },
        ],
      },
      {
        text: '书写文档',
        children: [
          { text: '指南', link: '/contribute/docs' },
          { text: '自定义head', link: '/contribute/og' },
          { text: 'Markdown插件', link: '/contribute/mk-plugin' },
        ],
      },
    ],
  },
  'panda': {
    guide: [
      {
        text: '指南',
        children: [
          { text: '设计', link: '/guide/design' },
          { text: '开始使用', link: '/guide/start' },
        ],
      },
    ],
    standard: [
      {
        text: '代码规范',
        children: [{ text: '引入', link: '/standard/index' }],
      },
    ],
  },
  'chat': {
    guide: [
      {
        text: '指南',
        children: [
          { text: 'sso认证', link: '/guide/sso' },
          { text: '开始使用', link: '/guide/start' },
        ],
      },
    ],
  },
  'sso': {
    guide: [
      {
        text: '指南',
        children: [
          { text: 'sso认证', link: '/guide/sso' },
          { text: '开始使用', link: '/guide/start' },
        ],
      },
    ],
  },
}

export interface SideConfigItem {
  text: string
  children: ConfigItem[]
}
export interface ConfigItem {
  text: string
  link: string
}

type SidebarsConfig = Record<string, Record<string, SideConfigItem[]>>

export default siderbarsConfig
