---
title: useClickoutSide
page: true
---

# useClickoutSide

用于监听点击事件发生在目标元素之外

## props

| 名称    | 说明                   | 类型                  |
| ------- | ---------------------- | --------------------- |
| handler | 触发点击之外的回调函数 | `Function`            |
| target  | 需要监听的`DOM`元素    | `Ref<HTMLElement>`    |
| options | 额外配置               | `ClickoutSideOptions` |

## ClickoutSideOptions

| 名称   | 说明                                 | 类型                            | 补充                                                                        |
| ------ | ------------------------------------ | ------------------------------- | --------------------------------------------------------------------------- |
| ignore | 需要忽略的元素，点击之后不会触发回调 | `(MayBeElementRef \| string)[]` | 数组类型，当传入 `string` 时，会以参数的形式传入`document.querySelectorAll` |

## demo

```vue

<template>
  <div ref="target">
    Hello world
  </div>
  <div>
    Outside element
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
  setup() {
    const target = ref(null)

    useClickoutSide(target, (event) => console.log(event))

    return { target }
  }
}
</script>

```
