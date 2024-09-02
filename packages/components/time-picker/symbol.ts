import type { MaybeRef } from '@panda-ui/common'
import type { InjectionKey } from 'vue'

export type TimeType = 'hour' | 'minute' | 'second'

export type Labels = Record<TimeType, string>

export interface TimeState {
  enterColumn: (type: 'prev' | 'next', canLoop?: boolean) => void
  resetColumn: (type: TimeType, reverse?: boolean) => void
  timeValue: Record<TimeType, number>
  enabled: Record<TimeType, boolean>
  activated: Record<TimeType, boolean>
  unitType: MaybeRef<TimeType | null>
}

interface TimePickerContext {
  setTimeValue: (type: TimeType, value: number) => void
  startState: TimeState
  endState: TimeState
}

export const timePickerContext: InjectionKey<TimePickerContext> = Symbol('time-picker')
