import { ComputedRef, InjectionKey } from 'vue'

export type DatePickerContext = {
  currentValue: ComputedRef<string>
  isRange: ComputedRef<boolean>
}

export const DATE_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> = Symbol()
