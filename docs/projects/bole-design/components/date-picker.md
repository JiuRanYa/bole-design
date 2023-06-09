---
title: date-picker
lang: zh-CN
---

<script setup>
const demos = import.meta.globEager('../../../demos/bole-design/date-picker/*/*.vue')
</script>

# DatePicker

一个多功能日期选择器

## 基础用法

::: demo

date-picker/basic

:::

## 预设

可以通过穿入`presets`属性来为日期选择器添加预设，默认显示形式为`Button group`，你也可以通过`trigger`插槽来自定义触发形式

::: demo

date-picker/preset

:::
