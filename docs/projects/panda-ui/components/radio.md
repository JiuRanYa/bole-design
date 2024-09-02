---
title: Radio
lang: zh-CN
desc: 允许用户从一组选项中进行单选，常用于表单提交或用户设置中。
---

# Radio

允许用户从一组选项中进行单选，常用于表单提交或用户设置中。

## 基础用法

最简单的使用方式

:::demo

radio/basic

:::

## 禁用状态

最简单的使用方式

:::demo

radio/disabled

:::

## 单选框组

通过使用`RadioGroup`可以将多个`Radio`组件关联起来

:::demo

radio/group

:::

## 竖向排列

`RadioGroup`传入`vertical`可竖向排列

:::demo

radio/vertical

:::

## Radio 参数

| 名称     | 说明         | 类型                          | 默认值  | 始于     |
| -------- | ------------ | ----------------------------- | ------- | -------- |
| value    | 绑定值       | `boolean \| string \| number` | `null`  | `v2.1.0` |
| label    | 单选框的标题 | `string`                      | `null`  | -        |
| disabled | 是否禁用     | `boolean`                     | `false` | `v2.1.0` |

## RadioGroup 参数

| 名称     | 说明           | 类型                          | 默认值  | 始于     |
| -------- | -------------- | ----------------------------- | ------- | -------- |
| value    | 绑定值         | `boolean \| string \| number` | `null`  | `v2.1.0` |
| disabled | 是否禁用       | `boolean`                     | `false` | `v2.1.0` |
| vertical | 是否为竖向排列 | `boolean`                     | `null`  | `v2.1.0` |
