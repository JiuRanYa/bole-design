---
title: date-picker
lang: zh-CN
description: 多功能日期选择器
---

# DatePicker

多功能日期选择器

## 基础用法

通过`v-model:value`可进行双向绑定

::: demo

date-picker/basic

:::

## 控制时间列

您可以传入`format`根据是否具有 Hms 来控制时间选择列的显示隐藏

::: demo

date-picker/format

:::

## 选择器类型

设置 `type` 属性的值可以切换日期选择框的选择类型。配合`format`控制时间列，您可以轻松实现多样化选择

::: demo

date-picker/dateTime

:::

## 日期预设

可以通过穿入 `presets` 属性来为日期选择器添加预设,可以是一个 `string` 类型，也可以是一个 `dayjs` 对象

:::demo

date-picker/preset

:::

## 范围选择

通过设置`type`属性为`range`可以支持范围选择

:::demo

date-picker/range

:::

同时范围选择器也可以搭配`presets`属性使用， 需要注意使用范围选择器时预设应该传入`数组`

:::demo

date-picker/rangePresets

:::

## 支持输入

可以使用`typing`属性对绑定的值进行格式化,可选值有`fixed`，`since`, `last`,

:::demo

date-picker/typing

:::

## 格式化

可以使用`valueFormat`属性对绑定的值进行格式化

:::demo

date-picker/valueFormat

:::

## 内置事件

DatePicker 提供了内置的事件，具体可查看下方事件

:::demo onChange 会在更新 modelValue 时触发:

date-picker/event

:::

## 处理时区

DatePicker 并未在内置处理时区，但您可以通过一下方式来更改时区

:::demo

date-picker/timezone

:::

## 自定义 Trigger

默认显示形式为`Button group`，你也可以通过`trigger`插槽来自定义触发形式

:::demo

date-picker/trigger

:::

## DatePicker 参数

| 名称           | 说明                                        | 类型                                           | 默认值   | 始于     |
| -------------- | ------------------------------------------- | ---------------------------------------------- | -------- | -------- |
| value          | 绑定的值                                    | `Dateable \| Dateable[]`                       | `null`   | -        |
| presets        | 需要提供的预设值                            | `Record<string, Dateable>`                     | `{}`     | -        |
| type           | 日期选择的类型，单选或者范围                | `static \| range \| dateTime \| dateTimeRange` | `static` | `v2.0.0` |
| format         | 根据是否具有 Hms 来控制时间选择列的显示隐藏 | `string`                                       | `null`   | `v2.0.0` |
| transitionName | 弹出面板的动画效果                          | `string`                                       | `drop`   | -        |
| valueFormat    | 更新绑定值的格式                            | `string`                                       | `null`   | -        |
| typing         | 是否可以输入                                | `string`                                       | `null`   | -        |

## 事件

| 名称     | 说明                  | 类型                       | 默认值 | 始于 |
| -------- | --------------------- | -------------------------- | ------ | ---- |
| onChange | modelValue 更新时触发 | `(Date \| Date[]) => void` | `null` | -    |
