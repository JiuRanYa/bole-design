# Panda UI

Panda Design System

## Features

- 📦 高质量的 Vue 3 组件
- 🔨 完全采用 TypeScript，类型定义清晰明确
- 📐 直观、简洁的 API 设计
- 🛫 提供解析器，支持 unplugin
- ⚡ 利用组合式 API，提供出色的性能基础
- 👀 接近业务代码的布局，降低了阅读源代码的门槛
- 🔧 可配置 props 的默认值，快速完成全局/局部修改
- 🚤 支持服务器端渲染 (SSR)
- 🚩 支持国际化 (i18n)
- 🎨 支持 CSS 变量，内置暗黑主题
- 💪 支持单元测试，保证系统的稳定性
- ✨ 提供高质量的组件和 Hooks,提高开发效率

## 快速安装

```shell
npm install panda-ui

yarn install panda-ui

//更推荐使用pnpm来解决您的幽灵依赖问题
pnpm install panda-ui

```

## 在项目中使用

```vue
import { createApp } from 'vue'
import App from './app.vue'

// 直接全局引入
import { install } from 'panda-ui'
import 'panda-ui/css/index.css'

createApp(App).use(install)
```

## 全量的 Typescript 类型支持

您需要在项目的`tsconfig.json`文件配置 `compilerOptions.types` 选项可以快速获得全局类型支持：

```json
{
  "compilerOptions": {
    "types": ["panda-ui/types"]
  }
}
```
