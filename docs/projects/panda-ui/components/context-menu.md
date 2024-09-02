---
title: ContextMenu
lang: zh-CN
description: 右键菜单
---

# ContextMenu

右键显示一个用户菜单 , 例如一组操作或功能 , 由特定的trigger元素触发。

## 基础用法

:::demo

context-menu/basic

:::

## 嵌套使用

您可以配合Dropdown轻松实现嵌套

:::demo

context-menu/nested

:::

## 事件

您可以使用`show`和`close`事件来获取`ContextMenu`的信息

:::demo

context-menu/event

:::

## ContextMenu 事件

| 名称  | 说明               | 类型   | 始于 |
| ----- | ------------------ | ------ | ---- |
| show  | 右键菜单展示时触发 | `slot` |      |
| close | 右键菜单关闭时触发 | `slot` |      |

## ContextMenu 插槽

| 名称    | 说明               | 类型   | 始于 |
| ------- | ------------------ | ------ | ---- |
| trigger | 触发右键菜单的元素 | `slot` |      |
| content | 右键菜单的内容     | `slot` |      |
