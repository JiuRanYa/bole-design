import { InjectionKey } from 'vue'

export interface DropdownContext {
  visible: boolean
  handleTriggerEnter: () => void
  handleTriggerOut: () => void
}
export const DROPDOWN_STATE: InjectionKey<DropdownContext> = Symbol()
