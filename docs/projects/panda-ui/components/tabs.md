---
title: Tabs
lang: zh-CN
description: 一个可以高度定制化的标签页组件
---

# Tabs

一个可以高度定制化的标签页组件

## 基础用法

您可以通过`TabsTrigger`组件来绑定不同 value 的内容，使得您可以对`Tabs`进行高度定制化

:::demo

tabs/basic

:::

## Tabs 位置

通过 tab-position 可以调节 tabs 的位置

:::demo

tabs/position

:::

## Tabs 事件

Tabs 内置了一些事件供您使用，例如`tabClick`

:::warning

如果您在 Tab 上设置了 disabled，事件也会被正常触发，但是不会改变值

:::

:::demo

tabs/event

:::

## Tabs 类型补充

```typescript
export type Side = 'top' | 'left' | 'right' | 'bottom'

export interface TabsTriggerEmitState {
  name: string
  disabled: boolean
}
```

## Tabs 参数

| 名称        | 说明                                             | 类型   | 默认值 | 始于      |
| ----------- | ------------------------------------------------ | ------ | ------ | --------- |
| value       | 设置当前激活的标签页，可以使用`v-model` 双向绑定 | ``     | `null` | `v1.1.13` |
| tabPosition | tab 标签的位置                                   | `Side` | `top`  | `v1.1.13` |

## TabsTrigger 参数

| 名称     | 说明                  | 类型    | 默认值 | 始于      |
| -------- | --------------------- | ------- | ------ | --------- |
| value    | 当前 Tab 的值         | ``      | `null` | `v1.1.13` |
| disabled | 是否禁用该 TabTrigger | `false` | `top`  | `v1.1.13` |

## 计划新增特性

1. 希望在 `Tabs` 提供`customStyle`属性，如果用户传入为`true`，则 `Tabs` 下所有样式均失效，只有 `Trigger` 功能和`API`

2. 支持 `default-class` 和 `active-class` 来制定默认样式和激活样式，这样可以通过全局的 `global config`配合`customStyle` 来实现高度的自定义样式，并且全局通用`Tabs`样式
