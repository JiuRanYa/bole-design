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
export type MaybeElement = HTMLElement | SVGElement | undefined | null
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>

export type Expand<T> = T extends unknown ? { [K in keyof T]: T[K] } : never

export type Side = 'top' | 'left' | 'right' | 'bottom'

export type Alignment = 'start' | 'end'

export type AlignedPlacement = `${Side}-${Alignment}`

export type Placement = Side | AlignedPlacement

export type Dateable = number | string | Date
