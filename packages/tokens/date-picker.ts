import { Meta } from '@bole-design/components/date-picker/props'
import { ComputedRef, InjectionKey } from 'vue'

export type DatePickerContext = {
  currentValue: ComputedRef<string | string[]>
  isRange: ComputedRef<boolean>
  startMeta: Meta
  endMeta: Meta
}

export const DATE_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> = Symbol()
