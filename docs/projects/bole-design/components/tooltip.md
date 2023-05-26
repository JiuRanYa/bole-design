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

:::demo 可以使用`placement`控制显示位置，共有 12 种位置

tooltip/placement

:::

### 触发行为

:::demo 可以通过`click`或`hover`触发

tooltip/trigger

:::

### 主题控制

:::demo 默认为反转主题来增加提示性，你也可以通过`reverse`来控制是否反转

tooltip/reverse

:::

### 受控模式

:::demo 通过`visible`控制 tooltip 的行为

tooltip/visible

:::

## Tooltip 属性

| 名称            | 类型                                        | 说明                                                                           | 默认值     | 始于    |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------ | ---------- | ------- |
| visible         | `boolean`                                   | 提示的显示状态，可以使用 `v-model` 双向绑定                                    | `false`    | -       |
| trigger         | `'hover' \| 'click' \| 'focus' \| 'custom'` | 下拉菜单的触发方式，当为 `custom` 时，所有情景都需要手动控制 `visible`         | `'hover'`  | -       |
| placement       | `Placement`                                 | 提示出现的位置，可选值同 Popper.js                                             | `'bottom'` | -       |
| content         | `string`                                    | tooltip 显示的文字内容，可被 content 插槽覆盖                                  | `'bottom'` | -       |
| reverse         | `boolean`                                   | 设置气泡是否为反色主题                                                         | `false`    | `2.0.0` |
| disabled        | `boolean`                                   | 设置是否禁用 tooltip                                                           | `false`    | `2.0.0` |
| transfer        | `boolean \| string`                         | 设置气泡的渲染位置，设置为 `true` 时默认渲染至 `<body>`，也可传入选择器 `#app` | `false`    | -       |
| wrap            | `boolean \| string`                         | 设置是否渲染包围元素                                                           | `false`    | `2.0.0` |
| noArrow         | `boolean`                                   | 设置是否显示箭头                                                               | `false`    | -       |
| mouseEnterDelay | `boolean`                                   | 设置鼠标移入出现 tooltip 的延迟，单位`ms`                                      | `100`      | -       |
| mouseLeaveDelay | `boolean`                                   | 设置鼠标移出后 tooltip 消失 的延迟，单位`ms`                                   | `100`      | -       |

### Tooltip 事件

| 名称      | 说明                                       | 参数                 | 始于 |
| --------- | ------------------------------------------ | -------------------- | ---- |
| toggle    | 当提示的显示状态改变时触发，返回当前的状态 | `(visible: boolean)` | -    |
| tip-enter | 当鼠标移入提示时触发，无返回值             | -                    | -    |
| tip-leave | 当鼠标移出提示时触发，无返回值             | -                    | -    |

### Tooltip 插槽

| 名称    | 说明               | 参数 | 始于 |
| ------- | ------------------ | ---- | ---- |
| default | 触发提示内容的插槽 | -    | -    |
| content | 提示内容的插槽     | -    | -    |
