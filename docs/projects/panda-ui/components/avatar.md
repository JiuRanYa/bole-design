---
title: Avatar
lang: zh-CN
description: 头像组件
---

# Avatar

## 基础用法

:::demo 通过`src`属性来展示头像

avatar/basic

:::

:::demo 圆形头像

avatar/circle

:::

:::demo 你也可以通过传入 `icon` 属性来显示 `svg`

avatar/icon

:::

## Avatar 参数

| 名称      | 说明                                     | 类型                                        | 默认值    | 始于 |
| --------- | ---------------------------------------- | ------------------------------------------- | --------- | ---- |
| src       | 加载图片的路径                           | `string`                                    | `null`    | -    |
| circle    | 是否展示为圆形                           | `boolean`                                   | `false`   | -    |
| icon      | 可以通过传入`icon` 属性来显示`svg`       | `svg`                                       | `null`    | -    |
| alt       | 描述当前图片，用于 `<img/>`标签上的`alt` | `boolean`                                   | `true`    | -    |
| size      | 预设图片的大小，传入`number`时单位为`px` | `number   \| small     \| default \| large` | `default` | -    |
| iconScale | 传入`svg`时用于缩放`svg icon`            | `string`                                    | `bl-drop` | -    |
