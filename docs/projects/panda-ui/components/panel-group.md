---
title: Panel Group
lang: zh-CN
description: 一个可以支持更改大小的面板集合
---

# Panel Group

一个可以支持更改大小的面板集合

## 基础用法

您可以配合`Panel`组件和`PanelResizeHandle`组件轻松实现自定义宽度

:::demo

panel-group/basic

:::

## 边界条件

`PanelGroup`通过`minSizePercentage`和`maxSizePercentage`来设置`最小宽度`和`最大宽度`

:::demo

panel-group/max

:::

## 垂直方向

通过设置`direction`为`horizontal`和`vertical`分别设置`水平方向`和`垂直方向`

:::demo

panel-group/vertical

:::

## 网格模式

`PanelGroup`支持了网格模式，默认栅格布局为`12列`，通过`grid`属性可以开启，开启后会自动调节面板宽度，目前已经支持垂直方向上的`grid`布局

:::demo

panel-group/grid

:::

## 嵌套使用

您可以通过简单的嵌套来实现多方向的布局

:::demo

panel-group/nested

:::

## 面板拖拽

`PanelGroup`暂未支持拖拽功能，后续会支持，您可以通过`vuedraggable`来实现拖拽

:::demo

panel-group/draggable

:::

## Panel Group 参数

| 名称       | 说明                                  | 类型             | 默认值                      | 始于      |
| ---------- | ------------------------------------- | ---------------- | --------------------------- | --------- |
| direction  | Panel的主轴方向                       | `PanelDirection` | `horizontal`                | `v1.11.0` |
| grid       | Panel开启栅格布局                     | `boolean`        | `false`                     | `v1.11.0` |
| layout     | 各个Panel的宽度百分比                 | `boolean`        | `默认各个panel平分100%宽度` | `v1.11.0` |
| gridLayout | 开启grid布局后各个Panel的所占栅格数量 | `boolean`        | `默认各个panel平分12个栅格` | `v1.11.5` |
| disabled   | 是否禁用Panel拖拽                     | `boolean`        | `false`                     | `v1.11.6` |

## Panel 参数

| 名称                  | 说明                            | 类型     | 默认值                 | 始于      |
| --------------------- | ------------------------------- | -------- | ---------------------- | --------- |
| defaultSizePercentage | Panel的默认大小                 | `number` | `所有面板平分可用空间` | `v1.11.0` |
| minSizePercentage     | Panel的百分比最小值             | `number` | `0`                    | `v1.11.0` |
| maxSizePercentage     | Panel的百分比最大值             | `number` | `100`                  | `v1.11.0` |
| minGridCol            | 开启grid布局后Panel的最小栅格数 | `number` | `3`                    | `v1.11.5` |

## 类型补充

```typescript
type PanelDirection = 'horizontal' | 'vertical'
```
