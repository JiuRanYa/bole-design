import { Meta } from '@panda-ui/components/date-picker/props'
import { ComputedRef, InjectionKey } from 'vue'

export type DatePickerContext = {
  currentValue: ComputedRef<string | string[]>
  isRange: ComputedRef<boolean>
  startMeta: Meta
  endMeta: Meta
  updateModelValue: (...args: any[]) => void
}

export const DATE_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> = Symbol()
