---
title: useClickOutside
page: true
---

# useClickoutSide

用于监听点击事件发生在目标元素之外

## 基本用法

## 参数类型

| 名称    | 说明                   | 类型                  |
| ------- | ---------------------- | --------------------- |
| handler | 触发点击之外的回调函数 | `Function`            |
| options | 额外配置               | `ClickoutSideOptions` |
| target  | 需要监听的`DOM`元素    | `Ref<HTMLElement>`    |

## ClickoutSideOptions

| 名称   | 说明                                 | 类型                            | 补充                                                                        |
| ------ | ------------------------------------ | ------------------------------- | --------------------------------------------------------------------------- |
| ignore | 需要忽略的元素，点击之后不会触发回调 | `(MayBeElementRef \| string)[]` | 数组类型，当传入 `string` 时，会以参数的形式传入`document.querySelectorAll` |

## 函数类型

```typescript
export declare function useClickOutside(
  handler: (event?: MouseEvent) => void,
  options?: ClickoutSideOptions,
  target?: Ref<HTMLElement | null | undefined>
): Ref<HTMLElement | null | undefined>

declare interface ClickoutSideOptions {
  ignore?: (MaybeElementRef | string)[]
}
```
