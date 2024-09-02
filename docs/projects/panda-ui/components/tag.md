---
title: Tag
lang: zh-CN
description: Tag组件，用于标记和选择。
---

# Tag

用于标记和选择。

## 基础用法

使用`type`来标记不同的标签类型

:::demo

tag/basic

:::

## 不同尺寸

使用`type`来标记不同的标签类型

:::demo

tag/size

:::

## Tag 参数

| 名称 | 说明     | 类型                       | 默认值      | 始于      |
| ---- | -------- | -------------------------- | ----------- | --------- |
| size | 标签大小 | `large \| middle \| small` | `middle`    | `v1.1.13` |
| type | 标签类型 | `TagType`                  | `secondary` | `v1.1.13` |

## 补充类型

```
export type TagType = 'success' | 'secondary' | 'error' | 'warning'
```
