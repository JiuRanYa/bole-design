---
title: Cascader
lang: zh-CN
description: 级联选择器
---

# Cascader

一个级联选择器，适用于需要突出`关系层级`的场景

## 基础用法

:::demo

cascader/basic

:::

## 禁用模式

`disabled`可以设置禁用模式

:::demo

cascader/disabled

:::

## 只读模式

`readonly`可设置只读模式

:::demo

cascader/readonly

:::

## 简短标签

您可以通过`brief-label`来只展示节点标签，忽略层级关系

:::demo

cascader/brief-label

:::

## 清除模式

您可以通过`clearable`来开启清除模式

:::demo

cascader/clearable

:::

## 设置分隔符

默认的分隔符为`/`，您也可以指定您想要的分隔符

:::demo

cascader/separator

:::

## 展开菜单的方式

默认的展开方式为`clikc`, 也可以通过`trigger`设置为`hover`展示子菜单

:::demo

cascader/hover

:::

## 级联层数

您必须选择到子节点才能选值，但是如果您需要规定在某些层级父节点可以单独选择，可以使用`cascadedCount`指定联级层数

:::demo

cascader/cascaded-count

:::

## 键值对配置

在某些情况下，您的树形数据结构可能与`Cascader`不大相同，您可以通过配置键值来达到同样的目的

:::demo

cascader/key-config

:::

## Cascader 事件

`Cascader`提供了`select`等内置的事件可以使用

:::demo

cascader/event

:::

## Cascader 参数

| 名称           | 说明                                                  | 类型               | 默认值         | 始于     |
| -------------- | ----------------------------------------------------- | ------------------ | -------------- | -------- |
| value          | Cascader 绑定的值                                     | `CascaderValue`    | `null`         | v1.13.20 |
| options        | 设置级联选择器的选项                                  | `CascaderOption[]` | `null`         | v1.13.20 |
| visible        | 是否显示面板支持双向绑定                              | `boolean`          | `false`        | v1.14.0  |
| brief-label    | 是否显示简短的标签值                                  | `boolean`          | `false`        | v1.13.20 |
| cascaded-count | 联级层数                                              | `number`           | `最深层`       | v1.13.20 |
| disabled       | 是否禁用                                              | `boolean`          | `false`        | v1.13.20 |
| readonly       | 是否只读                                              | `boolean`          | `false`        | v1.13.20 |
| trigger        | 如何展开子菜单                                        | `TriggerType`      | `click`        | v1.13.20 |
| placeholder    | 设置级联选择器的占位符                                | `string`           | `请选择`       | v1.13.20 |
| placement      | 选项列表的出现位置，可选值同 Popper.js                | `Placement`        | `bottom-start` | v1.13.20 |
| transitionName | 级联选择器出现的动画,应用于 Transition 组件           | `drop`             | `drop`         | v1.13.20 |
| to             | 设置选项列表的渲染位置，设置为 true 时默认渲染至 body | `string`           | `.bl-cascader` | v1.13.20 |
| popperAlive    | 设置 Popper 元素持久化,如果没有 to 会默认持久化       | `string`           | `true`         | v1.13.20 |

## Cascader 事件

| 名称   | 说明                  | 类型                                                         | 默认值 | 始于 |
| ------ | --------------------- | ------------------------------------------------------------ | ------ | ---- |
| change | modelValue 更新时触发 | `(fullValue: string, option: CascaderOptionState[]) => void` | `null` | -    |
| toggle | visible 更新时触发    | `(visible: boolean) => void`                                 | `null` | -    |
| select | 选择值时触发          | `(option: CascaderOptionState[]) => void`                    | `null` | -    |

## Cascader 补充类型

```ts
export type TriggerType = 'click' | 'hover'

export interface CascaderOption {
  label: string
  value: any
  disabled?: boolean
  children: CascaderOption[]
}

export interface CascaderKeyConfig {
  value?: string
  label?: string
  children?: string
  disabled?: string
  hasChild?: string
}
```
