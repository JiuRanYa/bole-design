---
title: Button
lang: zh-CN
---

# Message

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/message/*/*.vue')
</script>

一个简洁的信息提示组件

## 基础用法

:::demo

message/basic

:::

## 不同类型

:::demo

message/type

:::

## 自定义图标

您可以通过传入icon属性来自定义图标，或者传入`type`=`custom`来移除图标

:::demo

message/custom

:::

## 设置标题

通过设置`title`属性，您可以为Message添加标题
:::demo

message/title

:::

## Message类型

```typescript
export type MessageType = 'info' | 'success' | 'warning' | 'error'
```

## Message 参数

| 名称      | 说明                           | 类型          | 默认值 | 始于 |
| --------- | ------------------------------ | ------------- | ------ | ---- |
| message   | 需要展示的消息                 | `string`      | `null` | -    |
| type      | 消息类型                       | `MessageType` | `info` | -    |
| duration  | 消息展示的时长，单位`ms`       | `number`      | `2000` | -    |
| offset    | `Message` 距离窗口顶部的偏移量 | `number`      | `20`   | -    |
| repeatNum | 重复次数                       | `number`      | `1`    | -    |
