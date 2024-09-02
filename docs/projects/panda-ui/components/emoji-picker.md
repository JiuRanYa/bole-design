---
title: EmojiPicker
lang: zh-CN
description: 表情选择器
---

# EmojiPicker

## 基础用法

:::demo

emoji-picker/basic

:::

## EmojiPicker 参数

| 名称  | 说明                          | 类型     | 默认值 | 始于 |
| ----- | ----------------------------- | -------- | ------ | ---- |
| value | 绑定值，通过 v-model 双向绑定 | `string` | ``     | 始于 |
| size  | 表情大小                      | `number` | `18`   | 始于 |

## EmojiPicker 事件

| 名称   | 说明                         | 类型                     | 默认值       | 始于      |
| ------ | ---------------------------- | ------------------------ | ------------ | --------- |
| show   | 展示时过渡效果完全结束时触发 | `() => void`             | `() => void` | `v1.15.9` |
| hide   | 关闭时过渡效果完全结束时触发 | `() => void`             | `() => void` | `v1.15.9` |
| close  | 用户触发关闭时触发           | `() => void`             | `() => void` | `v1.15.9` |
| select | 用户选择时触发               | `(emoji: Emoji) => void` | `() => void` | `v1.15.9` |
