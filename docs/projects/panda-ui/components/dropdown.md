---
title: Dropdown
lang: zh-CN
---

# Dropdown

展示一个菜单给用户，例如一组由按钮触发的操作或功能。

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/dropdown/*/*.vue')
</script>

## 基础用法

:::demo

dropdown/basic

:::

## 嵌套使用

:::demo

dropdown/nested

:::

## Dropdown 组件参数

| 名称           | 说明                                                          | 类型        | 默认值   | 始于   |
| -------------- | ------------------------------------------------------------- | ----------- | -------- | ------ |
| visible        | 是否可见                                                      | `boolean`   | `false`  | -      |
| trigger        | dropdown菜单的触发方式                                        | `string`    | `click`  | -      |
| placement      | dropdown菜单展示的位置                                        | `Placement` | `bottom` | -      |
| transfer       | 设置dropdown菜单的渲染位置，设置为 true 时默认渲染至 `<body>` | `boolean    | string`  | `true` |
| transitionName | dropdown菜单的transition动画                                  | `string`    | ``       | -      |
