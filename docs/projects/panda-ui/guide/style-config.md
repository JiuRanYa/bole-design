---
title: Guild | Panda UI
page: true
lang: zh-CN
---

# 样式配置

Panda UI 的样式由 sass 编写，同时结合一些规则让配置变得容易。

## 通过 sass 修改

```scss
// style/index.scss
@forward 'panda-ui/css/src/index.scss' with (
  $content-color-map: (
    base: #5e6278
  )
);
```

然后在入口引入该文件

```ts
import './style/index.scss'

import { createApp } from 'vue'
import { install } from 'panda-ui'

createApp(App).use(install).mount('#app')

```
