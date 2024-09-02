---
title: 项目设计
page: true
description: Panda UI文档项目设计
---

## 开篇

Panda UI在设计之初时，`项目`是文档体系的最上层结构

不管添加任何配置，均要在`项目`的概念下

如果您对导航和侧边栏配置熟悉的话，您可能注意到`JSON`是均以项目名称作为key的

```ts
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
          { text: '样式配置', link: '/guide/style-config' }
        ]
      }
    ],
  },
  'panda': {
    start: [
      {
        text: '开始'
      }
    ]
  }
}
```

所有项目的文档，均要放在`web/docs/projects`下，文件夹名称必须是`项目名称`
