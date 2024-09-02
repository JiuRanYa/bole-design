---
title: usePopper
page: true
---

# usePopper

一个用于弹出的 Hook,适用于 `menu`、`tooltip` 等弹出场景

## 基本用法

## props

| 名称        | 说明                                                | 类型                                                  |
| ----------- | --------------------------------------------------- | ----------------------------------------------------- |
| popperEl    | 弹出的元素                                          | `Ref<HTMLElement \| null \| undefined>`               |
| placement   | 弹出的位置                                          | `Placement`                                           |
| transfer    | 元素需要迁移至的目标选择器，为 true 时会迁移至 body | `Ref<boolean \| string>`                              |
| referenceEl | 参考元素，popper 元素的位置计算依据                 | `Ref<Element \| VirtualElement \| null \| undefined>` |

## 类型定义

```typescript
export declare function usePopper(options: UsePopperOptions): {
  updatePopper: () => Promise<void>
  reference: Ref<HTMLElement | null | undefined>
  popper: Ref<HTMLElement | null | undefined> | undefined
  transferTo: ComputedRef<string | undefined>
}

declare interface UsePopperOptions {
  placement: Ref<Placement>
  /**
   * popper 元素需要迁移至的目标选择器，为 true 时会迁移至 body
   */
  transfer?: Ref<boolean | string>
  /**
   * 参考元素，popper 元素的位置计算依据
   */
  reference?: Ref<Element | VirtualElement | null | undefined>
  /**
   * popper 元素
   */
  popper?: Ref<HTMLElement | null | undefined>
  /**
   * 是否是下拉元素，需要处理transition-origin
   */
  isDrop?: boolean
}
```
