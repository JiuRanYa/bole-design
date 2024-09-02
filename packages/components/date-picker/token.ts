import type { Meta } from '@panda-ui/components/date-picker/props'
import type { ComputedRef, InjectionKey } from 'vue'

export interface DatePickerContext {
  currentValue: ComputedRef<string | string[]>
  isRange: ComputedRef<boolean>
  startMeta: Meta
  endMeta: Meta
}

export const DATE_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> = Symbol('date-picker')
