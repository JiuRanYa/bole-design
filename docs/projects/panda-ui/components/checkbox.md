---
title: Button
lang: zh-CN
---

# Checkbox

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/checkbox/*/*.vue')
</script>

## 基础用法

:::demo

checkbox/basic

:::

## Checkbox 参数

| 名称  | 类型                           | 说明      | 默认值 | 始于 |
| ----- | ------------------------------ | --------- | ------ | ---- |
| value | checkbox绑定的值               | `Boolean` | `null` | -    |
| label | 复选框的标签值，使用插槽后失效 | `string`  | `null` | -    |
