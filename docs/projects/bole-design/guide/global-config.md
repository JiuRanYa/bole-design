---
title: global-config
lang: en-US
---

## 全局配置

### 默认属性

`bole-design`提供了全局的配置功能，你可以在引入时配置不同组件的默认属性

你需要在 use 时传入第二个参数，`default`会修改全部组件的属性，你也可以选择单个组件的属性进行配置

```ts
import { createApp } from 'vue'
import { install } from 'bole-design'

createApp(App)
  .use(install, {
    props: {
      default: {
        size: 'small'
      },
      input: {
        size: 'large'
      },
      select: {
        size: 'middle'
      },
      checkbox: {
        size: 'large'
      }
    }
  })
  .mount('#app')

```

### 命名空间

`bole-design`可根据你的项目来自行修改前缀，包括`组件前缀`和`样式前缀`

#### 组件命名空间

```ts
createApp(App).use(install, { prefix: 'PD' })
```

配置后，使用组件时应该包含该前缀

```vue
<template>
  <PDButton></PDButton>
  <PDInput></PDInput>
</template>
```

#### 样式命名空间

'bole-design'的样式文件也可提供不同的命名空间，你可以在引入 sass 时这样配置

```sass
@use 'bole-design/style' with (
  $namespace: 'pd'
);

```

如果使用了 sass 命名空间，你必须在引入组件的时候传入`namespace`属性

:::warning
namespace 非可选参数,使用 sass 后一定要引入，否则组件样式会失效
:::

```ts
createApp(App).use(install, { namespace: 'pd' })
```
