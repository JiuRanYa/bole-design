---
title: usePopper
page: true
---

# usePopper

一个用于弹出的 Hook,适用于 `menu`、`tooltip` 等弹出场景

## props

| 名称        | 说明                                                | 类型                                                  |
| ----------- | --------------------------------------------------- | ----------------------------------------------------- |
| popperEl    | 弹出的元素                                          | `Ref<HTMLElement \| null \| undefined>`               |
| placement   | 弹出的位置                                          | `Placement`                                           |
| transfer    | 元素需要迁移至的目标选择器，为 true 时会迁移至 body | `Ref<boolean \| string>`                              |
| referenceEl | 参考元素，popper 元素的位置计算依据                 | `Ref<Element \| VirtualElement \| null \| undefined>` |

## demo

```vue

<template></template>

<script setup></script>
```
