---
title: Input
lang: zh-CN
description: Input输入框
---

# Input

## 基础用法

可以使用 `v-model:value` 进行双向绑定。

:::demo

input/basic

:::

## 不同大小

通过设置`size`属性可控制输入框的大小

:::demo

input/size

:::

## 内置图标

通过`prefix`和`suffix`插槽可以内置图标

:::demo

input/suffix

:::

前置图标

:::demo

input/prefix

:::

## before 元素

配合`Label`标签可以实现简单的表单
:::demo

input/before

:::

## after 元素

:::demo

input/after

:::

## Input 参数

| 名称        | 说明             | 类型      | 默认值  | 始于 |
| ----------- | ---------------- | --------- | ------- | ---- |
| value       | 绑定的值         | `string`  | ``      | -    |
| autofocus   | 是否自动聚焦     | `boolean` | `false` | -    |
| debounce    | 是否开启防抖     | `boolean` | `true`  | -    |
| placeholder | placeholder 内容 | `string`  | ``      | -    |

## Input 事件

| 名称   | 说明                 | 类型            | 始于     |
| ------ | -------------------- | --------------- | -------- |
| change | 绑定值发生改变时触发 | (value) => void | `v1.2.5` |

## Input 插槽

| 名称   | 说明     | 参数 | 始于 |
| ------ | -------- | ---- | ---- |
| prefix | 前缀内容 | ``   | -    |
