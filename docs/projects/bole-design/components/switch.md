---
title: Switch
lang: zh-CN
---

# Switch

开关选择器

<script setup>
const demos = import.meta.globEager('../../../demos/bole-design/switch/*/*.vue')
</script>

## 基础用法

通过`v-model`可以双向绑定

:::demo

switch/basic

:::

## 内置图标

`Switch`组件中提供了`open-icon`和`close-icon`来定制开关图标

:::demo

switch/icon

:::

## ButtonGroup

| 名称       | 类型      | 说明         | 默认值  | 始于 |
| ---------- | --------- | ------------ | ------- | ---- |
| value      | `Boolean` | 开关是否打开 | `false` | -    |
| open-icon  | `Icon`    | 打开时的图标 | `null`  | -    |
| close-icon | `Icon`    | 关闭时的图标 | `null`  | -    |
