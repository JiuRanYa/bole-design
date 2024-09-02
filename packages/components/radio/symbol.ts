import type { InjectionKey, Ref } from 'vue'

export interface RadioGroupContext {
  currentValue: Ref<string | number | boolean>
  disabled: boolean
  updateValue: (value: string | number | boolean) => void
}

export const RADIO_GROUP_INJECTION_KEY: InjectionKey<RadioGroupContext> = Symbol('radio-group')
