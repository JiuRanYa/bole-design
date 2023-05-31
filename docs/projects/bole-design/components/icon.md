---
title: Icon
lang: zh-CN
---

<script setup>
const demos = import.meta.globEager('../../../demos/bole-design/icon/*/*.vue')
</script>

# Icon

`Bole Design` 使用` @bole-design/icons` 作为图标库，该图标库收集于 `Font Awesome 6.x` 的免费图标

你也可以直接在`Icon` 组件下放置任何 `svg `内容

## 基本用法

通过`icon`属性传递, 可以直接把 svg 组件丢给 icon 属性，也可以直接放默认插槽下。

:::demo

icon/basic

:::

## 自定义大小

您可以通过修改 `scale` 的值来改变图标大小

:::demo

icon/scale

:::

## 类型

默认使用`solid`类型图标，您也可以通过在后面加`R`来引入`Ragular`类型的图标

:::demo

icon/solid

:::
