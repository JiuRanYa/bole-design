---
title: Card
lang: zh-CN
---

# Card

一个卡片组件，对于构建表单更加友好

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/card/*/*.vue')
</script>

## 基础用法

你可以通过`Card`的相关组件轻松构建表单

:::demo 一个简单的表单卡片

card/basic

:::

## Card 参数

| 名称        | 说明                                                | 类型     | 默认值 | 始于 |
| ----------- | --------------------------------------------------- | -------- | ------ | ---- |
| title       | 应用于Card Header中的title，当使用Card Header时失效 | `string` | ``     | -    |
| description | 应用于Card Header中的title，当使用Card Header时失效 | `string` | ``     | -    |
