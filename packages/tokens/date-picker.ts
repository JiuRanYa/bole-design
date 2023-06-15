import { ComputedRef, InjectionKey } from 'vue'

export type DatePickerContext = {
  currentValue: ComputedRef<string>
}

export const DATE_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> = Symbol()
