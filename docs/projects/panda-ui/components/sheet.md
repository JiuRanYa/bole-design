---
title: Sheet
lang: zh-CN
description: 扩展对话框组件以显示与屏幕主要内容相补充的内容。
---

# Sheet

扩展对话框组件以显示与屏幕主要内容相补充的内容。

## 基础用法

使用`v-model:active`可以进行双向绑定

:::demo

sheet/basic

:::

## 隐藏图标

通过设置`closeble`，您可以选择隐藏或显示关闭按钮

:::demo

sheet/closeble

:::

## Sheet 参数

| 名称           | 说明                        | 类型      | 默认值       | 始于 |
| -------------- | --------------------------- | --------- | ------------ | ---- |
| active         | 绑定的值                    | `boolean` | `false`      | -    |
| size           | sheet 内容的宽度            | `370px`   | `false`      | -    |
| closeble       | 需要提供的预设值            | `boolean` | `true`       | -    |
| transitionName | Sheet 内容的 Trasntion 效果 | `string`  | `move-right` | -    |
| maskTransition | 遮罩层的 Trasntion 效果     | `string`  | `fade`       | -    |

## Sheet 事件

| 名称        | 说明                         | 类型         | 默认值       | 始于      |
| ----------- | ---------------------------- | ------------ | ------------ | --------- |
| show        | 展示时过渡效果完全结束时触发 | `() => void` | `() => void` | `v1.15.9` |
| hide        | 关闭时过渡效果完全结束时触发 | `() => void` | `() => void` | `v1.15.9` |
| close       | 用户触发关闭时触发           | `() => void` | `() => void` | `v1.15.9` |
| onMaskClick | 点击遮罩层时触发             | `() => void` | `null`       | -         |
