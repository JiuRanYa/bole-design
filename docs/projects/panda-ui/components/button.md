---
title: Button
lang: zh-CN
description: 一个基础的按钮组件
---

# Button

一个基础的按钮组件

## 基本用法

:::demo 使用 `type` 定义组件样式

button/basic

:::

## 其他按钮

`panda-ui`还提供了常规的几种按钮样式,颜色较为鲜艳

:::demo

button/color

:::

## 禁用状态

:::demo 使用 `disabled` 设置组件的禁用状态

button/disable

:::

## 不同尺寸

使用 `size` 设置按钮大小

:::demo

button/size

:::

## 内嵌图标

当需要在按钮内嵌入图标时，可以将图标组件直接传入 `icon` 属性。

也可以直接在插槽内使用 `Icon` 组件。

:::demo

button/icon

:::

## 按钮组

通过`ButtonGroup`组件可以组合多个按钮

:::demo

button/group

:::

## Button 参数

| 名称    | 说明           | 类型                                                        | 默认值    | 始于 |
| ------- | -------------- | ----------------------------------------------------------- | --------- | ---- |
| type    | 按钮的类型     | `default \| primary \| warn \| success \| warning \| error` | `default` | -    |
| disabled | 是否禁用按钮   | `Boolean`                                                   | `false`   | -    |
| icon    | 按钮的前置图标 | `svg`                                                       | `null`    | -    |

## ButtonGroup 参数

| 名称   | 类型             | 说明      | 默认值  | 始于 |
| ------ | ---------------- | --------- | ------- | ---- |
| circle | 按钮组是否为圆角 | `Boolean` | `false` | -    |

## Button 插槽

| 名称 | 说明       |
| ---- | ---------- |
| icon | 按钮的图标 |
