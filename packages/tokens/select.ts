import { SelectStates } from 'packages/components/select/useSelect'
import { InjectionKey } from 'vue'

export interface SelectContext {
  props: {
    value?: string | number | unknown | unknown[] | any[]
  }
  states: SelectStates
}
export const selectKey: InjectionKey<SelectContext> = Symbol('BlSelect')
