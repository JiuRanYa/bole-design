import type { SelectStates } from 'packages/components/select/useSelect'
import type { InjectionKey } from 'vue'

export interface SelectContext {
  props: {
    value?: string | number | unknown | unknown[] | any[]
  }
  states: SelectStates
}
export const selectKey: InjectionKey<SelectContext> = Symbol('BlSelect')
