import { InjectionKey } from 'vue'

export interface SelectContext {
  props: {
    value?: string | number | unknown | unknown[]
  }
}
export const selectKey: InjectionKey<SelectContext> = Symbol('BlSelect')
