---
title: Button
lang: zh-CN
description: Checkbox
---

# Checkbox

## 基础用法

:::demo

checkbox/basic

:::

## 全选功能

在实现全选功能时，可能会用到`indeterminate`属性，下面是一个实现全选的简单例子

:::demo

checkbox/indeterminate

:::

## Checkbox 参数

| 名称          | 类型                           | 说明      | 默认值  | 始于     |
| ------------- | ------------------------------ | --------- | ------- | -------- |
| value         | checkbox 绑定的值              | `Boolean` | `false` | -        |
| label         | 复选框的标签值，使用插槽后失效 | `string`  | `null`  | -        |
| indeterminate | 复选框状态，只负责样式控制     | `boolean` | `false` | `v2.0.3` |

## Checkbox 事件

| 名称   | 说明                  | 类型                       | 默认值 | 始于 |
| ------ | --------------------- | -------------------------- | ------ | ---- |
| change | modelValue 更新时触发 | `(value: boolean) => void` | `null` | -    |
