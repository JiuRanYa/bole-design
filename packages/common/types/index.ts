import type { Ref } from 'vue'

export const booleanProps = {
  type: Boolean,
  default: null
}
export const booleanStringProp = {
  type: [Boolean, String],
  default: null
}

export type EnsureValue<T> = Exclude<T, undefined | null>

export type MaybeRef<T> = T | Ref<T>

export type Expand<T> = T extends unknown ? { [K in keyof T]: T[K] } : never
