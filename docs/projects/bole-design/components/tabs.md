---
title: Tabs
lang: zh-CN
---

# Tabs

一个可以高度定制化的标签页组件

<script setup>
const demos = import.meta.globEager('../../../demos/bole-design/tabs/*/*.vue')
</script>

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

## 计划新增特性

1. 希望在 `Tabs` 提供`customStyle`属性，如果用户传入为`true`，则 `Tabs` 下所有样式均失效，只有 `Trigger` 功能和`API`

2. 支持 `default-class` 和 `active-class` 来制定默认样式和激活样式，这样可以通过全局的 `global config`配合`customStyle` 来实现高度的自定义样式，并且全局通用`Tabs`样式
