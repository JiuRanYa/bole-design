---
title: ScrollArea
lang: zh-CN
description: 一个滚动区域，内部实现采用浏览器原生滚动以获得更好的兼容性与性能。
---

# ScrollArea

一个滚动区域，内部实现采用浏览器原生滚动以获得更好的兼容性与性能。

## 基础用法

滚动设置 height 属性的值，当内容的高度超过该值后即可滚动，height可以是任何有效的css值

:::demo

scroll-area/basic

:::

## 监听变化

通过开启watchResize属性，可以检测view区域高度的变化，当内容未超出高度时不显示滚动条，超出时显示

:::demo

scroll-area/watch-resize

:::

## 横向滚动

`scroll-area`的`mode`参数可以改变滚动方向

:::demo

scroll-area/mode

:::

## Scroll事件

`scroll-area`的`scroll`方法可以在滚动时触发

:::demo

scroll-area/scroll-event

:::

## Scroll Area 参数

| 名称         | 说明                   | 类型             | 默认值     | 始于       |
| ------------ | ---------------------- | ---------------- | ---------- | ---------- |
| mode         | 滚动模式，横向或者竖向 | `ScrollAreaMode` | `vertical` | `v1.13.15` |
| height       | 可视区域的高度         | `string`         | ``         | `v1.11.5`  |
| maxHeight    | 可视区域的最大高度     | `string`         | ``         | `v1.11.5`  |
| watchResize  | 是否监听内容的高度变化 | `boolean`        | `false`    | `v1.11.5`  |
| tag          | 视图的元素标签         | `string`         | `div`      | `v1.11.5`  |
| viewClass    | 内容区域视图的额外样式 | `string`         | `null`     | `v1.11.5`  |
| wrapperClass | 可视区域视图的额外样式 | `string`         | `null`     | `v1.11.5`  |

## Scroll Area 事件

| 名称   | 说明       | 类型                   | 默认值 | 始于      |
| ------ | ---------- | ---------------------- | ------ | --------- |
| scroll | 滚动时触发 | `(e: ScrollAreaEvent)` | `null` | `v1.13.5` |

## 补充类型

```ts
interface ScrollAreaEvent {
  el?: HTMLElement
  originEvent?: Event
  thumbLength: number
  isDragging: boolean
}

export type ScrollAreaMode = 'horizontal' | 'vertical'
```
