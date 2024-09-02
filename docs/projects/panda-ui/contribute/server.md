---
title: server
lang: en-US
description: 开发命令
---

# 开发命令

## 新增组件

```shell
pnpm create
```

运行命令后，会自动生成所有`demo` , `component` 模版和`docs markdown`，

## 组件开发环境

```shell
pnpm serve
```

该命令会读取`demos`下的文件目录文件动态生成路由，并通过`pnpm`的`workspace`链接到你的`component`源目录下
