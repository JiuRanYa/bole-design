---
title: InputNumber
lang: zh-CN
description: 一个仅支持数字的输入框
---

# InputNumber

一个仅支持数字的输入框, 可以解决 js 的精度问题

## 基础用法

:::demo

input-number/basic

:::

## 禁用模式

`disabled`可控制输入器的禁用状态

:::demo

input-number/disabled

:::

## 控制器

通过配置`control-position`可调整控制器的显示,目前仅支持`right`

:::info

可通过鼠标持续点击来增加，也可以通过键盘上下来控制

:::

:::demo

input-number/control

:::

## 不同尺寸

通过`size`属性可指定数字选择器的尺寸

:::demo

input-number/size

:::

## 格式化

传入`formatter`函数可以格式化显示内容，为了保证只聚焦于数据，在输入时只展示数字

:::demo

input-number/format

:::

## 控制精度

`precision`属性可以设置数值保留的精度。

:::demo

input-number/precision

:::

:::tip
precision 的值必须是一个非负整数，并且不能小于 step 的小数位数。
:::

## 增减幅度

设置`step` 属性可以改变每次增减数值的幅度。

:::demo

input-number/step

:::

## 同步输入

`InputNumber`默认触发更新为`change`，您可以通过`sync`属性来更改为`input`

:::demo

input-number/sync

:::

## 最大值最小值

`min`和`max`参数分别可以设置输入器的`最小值`和`最大值`,当输入超出最大值时会`警告`

:::demo

input-number/range

:::

## InputeNumber 组件参数

| 名称             | 说明                               | 类型               | 默认值       | 始于    |
| ---------------- | ---------------------------------- | ------------------ | ------------ | ------- |
| value            | InputeNumber 绑定的值              | `number \| string` | `null`       | v1.14.2 |
| disabled         | 是否禁用                           | `boolean`          | `false`      | v1.14.2 |
| autofocus        | 是否自动聚焦                       | `boolean`          | `false`      | v1.15.7 |
| autocomplete     | 是否自动完成                       | `boolean`          | `false`      | v1.15.7 |
| min              | 最小值                             | `number`           | `-Infinity`  | v1.14.2 |
| max              | 最大值                             | `number`           | `Infinity`   | v1.14.2 |
| precision        | 数字显示的精度                     | `number`           | `null`       | v1.14.2 |
| step             | 数字增减的步长                     | `number`           | `1`          | v1.14.2 |
| placeholder      | 同 input 的 placeholder            | `string`           | `请输入数字` | v1.14.2 |
| control-position | 控制器显示的位置,不传时默认不显示  | `string`           | `null`       | v1.14.2 |
| debounce         | 输入数字时采用防抖，关闭时采用节流 | `boolean`          | `false`      | v1.14.2 |

## InputeNumber 组件事件

| 名称   | 说明                                                  | 类型              | 默认值 | 始于    |
| ------ | ----------------------------------------------------- | ----------------- | ------ | ------- |
| input  | 输入时 trigger                                        | `(value) => void` | `null` | v1.14.2 |
| change | 当值改变并且 blur 时 trigger，同 input 的 change 事件 | `(value) => void` | `null` | v1.14.2 |

## InputeNumber 补充类型

```ts
export type controlPosition = 'right'
```
