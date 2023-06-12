---
title: start
lang: en-US
---

# 贡献指南

`bole design` 基于 `pnpm`，所以确保您安装了 `pnpm`

```shell
pnpm -v
```

## 准备工作

`bole design` 使用了内置的 `@bole-design/icons`，并且在`internal` 目录下使用了`unbuild` 编译`node` 代码，

所以在启动项目前，你应该编译这俩个包

```shell
pnpm build:icons

pnpm build:internal
```

## 网站预览

```shell
pnpm serve:docs
```

## 本地开发

```shell
pnpm serve
```

如果需要新增`components`，请查看[开发命令](/projects/bole-design/contribute/server)
