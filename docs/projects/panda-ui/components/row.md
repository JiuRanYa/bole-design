---
title: row
lang: zh-CN
---

# Row

一维栅格布局组件，基于列来定义区域块

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/row/*/*.vue')
</script>

## 基本用法

:::demo 使用 gap 来定义

row/basic

:::

## Row 参数

| 名称    | 说明                                             | 类型                   | 默认值  | 始于 |
| ------- | ------------------------------------------------ | ---------------------- | ------- | ---- |
| align   | 垂直对齐方式                                     | `top`                  | `null`  | -    |
| justify | 水平排列方式                                     | `JustifyType`          | `start` | -    |
| gap     | 栅格间隔，可以传入 [horizontal，vertical] 的数组 | `number   \| number[]` | `0`     | -    |
| tag     | 渲染的元素名称                                   | `string`               | `div`   | -    |
