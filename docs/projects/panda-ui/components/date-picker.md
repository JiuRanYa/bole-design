---
title: date-picker
lang: zh-CN
---

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/date-picker/*/*.vue')
</script>

# DatePicker

多功能日期选择器

## 基础用法

通过`v-model:value`可进行双向绑定

::: demo

date-picker/basic

:::

## 预设

可以通过穿入 `presets` 属性来为日期选择器添加预设,可以是一个 `string` 类型，也可以是一个 `dayjs` 对象

:::demo

date-picker/preset

:::

## 范围选择器

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

date-picker/format

:::

## 内置事件

DatePicker 提供了内置的事件，具体可查看下方事件

:::demo onChange 会在更新 modelValue 时触发:

date-picker/event

:::

## 自定义 Trigger

默认显示形式为`Button group`，你也可以通过`trigger`插槽来自定义触发形式

:::demo

date-picker/trigger

:::

## DatePicker 参数

| 名称           | 说明                         | 类型                       | 默认值   | 始于 |
| -------------- | ---------------------------- | -------------------------- | -------- | ---- |
| value          | 绑定的值                     | `Dateable \| Dateable[]`   | `null`   | -    |
| presets        | 需要提供的预设值             | `Record<string, Dateable>` | `{}`     | -    |
| type           | 日期选择的类型，单选或者范围 | `static \| range`          | `static` | -    |
| transitionName | 弹出面板的动画效果           | `string`                   | `drop`   | -    |
| valueFormat    | 更新绑定值的格式             | `string`                   | `null`   | -    |
| typing         | 是否可以输入                 | `string`                   | `null`   | -    |

## 事件

| 名称     | 说明                  | 类型                       | 默认值 | 始于 |
| -------- | --------------------- | -------------------------- | ------ | ---- |
| onChange | modelValue 更新时触发 | `(Date \| Date[]) => void` | `null` | -    |
