---
title: Button
lang: zh-CN
---

# Button

一个基础的按钮组件

<script setup>
const demos = import.meta.globEager('../../../demos/bole-design/button/*/*.vue')
</script>

## 基本用法

:::demo 使用 `type` 定义组件样式

button/basic

:::

## 禁用状态

:::demo 使用 `disable` 设置组件的禁用状态

button/disable

:::

## Button 属性

| 名称    | 类型                                                        | 说明         | 默认值    | 始于 |
| ------- | ----------------------------------------------------------- | ------------ | --------- | ---- |
| type    | `default \| primary \| warn \| success \| warning \| error` | 按钮的类型   | `default` | -    |
| disable | `Boolean`                                                   | 是否禁用按钮 | `false`   | -    |
