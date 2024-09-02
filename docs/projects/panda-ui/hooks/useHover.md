---
title: useNamespace
page: true
---

# useHover

## 基本用法

用于监听元素hover状态

## 类型定义

```typescript
export declare function useHover(wrapper?: Ref<HTMLElement | null | undefined>): {
  wrapper: Ref<HTMLElement | null | undefined>
  isHover: Ref<boolean>
}
```
