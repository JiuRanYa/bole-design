---
title: FullScreen
lang: zh-CN
---

# FullScreen

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/full-screen/*/*.vue')
</script>

## 基础用法

您可通过 v-slot 拿到 exit、enter 和 toggle 方法，来决定是否全屏显示某个内容。

:::demo

full-screen/basic

:::

## 配合transfer元素使用

如果你想要将像是 `Tooltip`、`Modal` 这样的具有 `transfer` 属性的组件一同使用，需要确保 `transfer` 属性的目标位置位于全屏组件内。

:::demo

full-screen/transfer

:::

## FullScreen 组件参数

| 名称   | 说明             | 类型                                                        | 始于 |
| ------ | ---------------- | ----------------------------------------------------------- | ---- |
| enter  | 进入全屏模式     | `(type?: FullScreenType, zIndex?: number) => Promise<void>` | -    |
| exit   | 退出全屏模式     | `() => Promise<void>`                                       | -    |
| toggle | 自动切换全屏状态 | `(type?: FullScreenType, zIndex?: number) => Promise<void>` | -    |
