---
title: TimePicker
lang: zh-CN
---

# TimePicker

一个多功能时间选择器

## 基础用法

:::demo

time-picker/basic

:::

## 时间标签

通过设置 labels 可以自定义时间标签，可以配合`separator`属性使用

:::demo

time-picker/labels

:::

## 格式化

通过设置`format`可以自定义时间格式，该属性会控制列的显示和隐藏

:::demo

time-picker/format

:::

## 调整跨度

当你需要控制用户输入时间时你可能会用到它

可以通过设置`hourStep`、`minuteStep`、`secondStep`分别为不同时间设置跨度

:::demo

time-picker/step

:::

## 选择确认

`TimePicker` 默认会根据 `picker` 的交互行为，自动选择是否需要确认按钮。你也可以通过 `needConfirm` 属性来手动设置是否需要确认按钮。

:::demo

time-picker/needConfirm

:::

## 范围选择

通过设置`range`属性来进行范围选择

:::demo

time-picker/range

:::

## TimePicker 参数

| 名称        | 说明                                     | 类型                       | 默认值     | 始于       |
| ----------- | ---------------------------------------- | -------------------------- | ---------- | ---------- |
| value       | 绑定值，通过 v-model 双向绑定            | `string`                    | string[]`  | `v1.15.14` |
| hourStep    | 小时列的跨度                             | `number`                   | `1`        | `v1.15.14` |
| minuteStep  | 分钟列的跨度                             | `number`                   | `1`        | `v1.15.14` |
| secondStep  | 秒列的跨度                               | `number`                   | `1`        | `v1.15.14` |
| separator   | 设置时间的分隔符                         | `string`                   | `:`        | `v1.15.14` |
| range       | 是否开启范围选择                         | `boolean`                  | `true`     | `v1.15.14` |
| format      | 格式化, 通过控制格式化来控制列的显示隐藏 | `string`                   | `HH:mm:ss` | `v1.15.14` |
| visible     | 是否显示 Panel                           | `boolean`                  | `false`    | `v1.15.14` |
| needConfirm | 选择日期是否需要确认，未开启时失焦触发   | `boolean`                  | `false`    | `v1.15.14` |
| noSuffix    | 是否显示后缀，开启后不显示后缀图标       | `boolean`                  | `false`    | `v1.15.14` |
| labels      | 设置时间显示的 labels                    | `Record<TimeType, string>` | `null`     | `v1.15.14` |

## TimePicker 事件

| 名称  | 说明                                       | 参数                              | 始于       |
| ----- | ------------------------------------------ | --------------------------------- | ---------- |
| focus | 控件聚焦时触发                             | -                                 | `v1.15.14` |
| blur  | 控件失去焦点时触发                         | -                                 | `v1.15.14` |
| input | 通过按键输入任意类型时间的值发生改变时触发 | `(type: TimeType, value: number)` | `v1.15.14` |
| plus  | 使用上箭头按键增加时间值时触发             | `(type: TimeType, value: number)` | `v1.15.14` |
| minus | 使用下箭头按键减少时间值时触发             | `(type: TimeType, value: number)` | `v1.15.14` |

## 补充类型

```typescript
export type TimeType = 'hour' | 'minute' | 'second'

export type Labels = Record<TimeType, string>
```
