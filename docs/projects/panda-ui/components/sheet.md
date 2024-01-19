---
title: Sheet
lang: zh-CN
---

# Sheet

扩展对话框组件以显示与屏幕主要内容相补充的内容。

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/sheet/*/*.vue')
</script>

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
| size           | sheet内容的宽度             | `370px`   | `false`      | -    |
| closeble       | 需要提供的预设值            | `boolean` | `true`       | -    |
| transitionName | Sheet 内容的 Trasntion 效果 | `string`  | `move-right` | -    |
| maskTransition | 遮罩层的 Trasntion 效果     | `string`  | `fade`       | -    |

## Sheet 事件

| 名称        | 说明             | 类型         | 默认值 | 始于 |
| ----------- | ---------------- | ------------ | ------ | ---- |
| onMaskClick | 点击遮罩层时触发 | `() => void` | `null` | -    |
