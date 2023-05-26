---
title: tooltip
lang: zh-CN
---

## Tooltip

<script setup>
const demos = import.meta.globEager('../../../demos/bole-design/tooltip/*/*.vue')
</script>

用于需要在特定元素周围弹出一下拓展信息。

### 基础用法

:::demo

tooltip/basic

:::

### 显示位置

:::demo 可以使用`placement`控制显示位置

tooltip/placement

:::

### visible

:::demo 通过`visible`控制 tooltip 的行为

tooltip/visible

:::

## Tooltip 属性

| 名称      | 类型                                        | 说明                                                                   | 默认值     | 始于    |
| --------- | ------------------------------------------- | ---------------------------------------------------------------------- | ---------- | ------- |
| visible   | `boolean`                                   | 提示的显示状态，可以使用 `v-model` 双向绑定                            | `false`    | -       |
| trigger   | `'hover' \| 'click' \| 'focus' \| 'custom'` | 下拉菜单的触发方式，当为 `custom` 时，所有情景都需要手动控制 `visible` | `'hover'`  | -       |
| placement | `Placement`                                 | 提示出现的位置，可选值同 Popper.js                                     | `'bottom'` | -       |
| reverse   | `boolean`                                   | 设置气泡是否为反色主题                                                 | `false`    | `2.0.0` |
| transfer  | `boolean \| string`                         | 设置气泡的渲染位置，设置为 `true` 时默认渲染至 `<body>`                | `false`    | -       |
| wrap      | `boolean \| string`                         | 设置是否渲染包围元素                                                   | `false`    | `2.0.0` |

### Tooltip 事件

| 名称      | 说明                                       | 参数                 | 始于 |
| --------- | ------------------------------------------ | -------------------- | ---- |
| toggle    | 当提示的显示状态改变时触发，返回当前的状态 | `(visible: boolean)` | -    |
| tip-enter | 当鼠标移入提示时触发，无返回值             | -                    | -    |
| tip-leave | 当鼠标移出提示时触发，无返回值             | -                    | -    |

### Tooltip 插槽

| 名称    | 说明               | 参数 | 始于 |
| ------- | ------------------ | ---- | ---- |
| trigger | 触发提示内容的插槽 | -    | -    |
| default | 提示内容的插槽     | -    | -    |
