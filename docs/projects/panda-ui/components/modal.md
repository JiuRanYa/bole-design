---
title: modal
lang: zh-CN
description: 弹窗组件
---

# Modal

## 基础用法

:::demo

modal/basic

:::

## 定制宽高

您可以通过`top`、`weight`、`height`来自定义内容

:::demo

modal/custom

:::

## 反转遮罩

通过开启`reverse-backdrop`可以让遮罩层反转颜色

:::demo

modal/reverse

:::

## Modal 参数

| 名称             | 说明                                                             | 类型      | 默认值    | 始于      |
| ---------------- | ---------------------------------------------------------------- | --------- | --------- | --------- |
| active           | modal 是否展示                                                   | `boolean` | `false`   | -         |
| inner            | 设置是否为一个内联的模态框，开启后定位从 `fixed` 变位 `absolute` | `boolean` | `false`   | -         |
| transfer         | 设置模态框的渲染位置，设置为 true 时默认渲染至 `<body>`          | `string`  | `null`    | -         |
| top              | 距离顶部的位置                                                   | `string`  | `30vh`    | -         |
| weight           | 弹窗内容的宽度                                                   | `string`  | `550px`   | `v1.7.11` |
| height           | 弹窗内容的高度                                                   | `string`  | ``        | `v1.7.11` |
| mask-close       | 是否可以点击遮罩层关闭                                           | `boolean` | `true`    | `v1.12.1` |
| dialog-class     | 对话框样式                                                       | `string`  | ``        | `v2.1.3` |
| reverse-backdrop | 反转遮罩层的颜色                                                 | `boolean` | `false`   | `v1.7.11` |
| transitionName   | 模态框的 transiton 名称，可用于修改模态框动画                    | `string`  | `fade-in` | -         |

## Modal 事件

| 名称  | 说明                         | 类型         | 默认值       | 始于      |
| ----- | ---------------------------- | ------------ | ------------ | --------- |
| close | 用户触发关闭时触发           | `() => void` | `() => void` | `v1.15.9` |
| show  | 展示时过渡效果完全结束时触发 | `() => void` | `() => void` | `v1.15.9` |
| hide  | 关闭时过渡效果完全结束时触发 | `() => void` | `() => void` | `v1.15.9` |
