import { PropType } from 'vue'
import { buildProps, Dateable, eventProp, Placement } from '@panda-ui/common'
import { datePickerSharedProps } from './shared'
import type { Dayjs } from 'dayjs'

export type OriginDate = {
  year: number
  month: number
  day: number
}
export type DatePickerType = 'static' | 'range'
export type DatePickerTyping = 'fixed' | 'since' | 'last'

export const datePickerPanelProps = buildProps({
  ...datePickerSharedProps
})

export const datePickerProps = buildProps({
  ...datePickerSharedProps,
  placement: String as PropType<Placement>,
  transitionName: String || Function,
  presets: Object as PropType<Record<string, Dateable>>,
  type: String as PropType<DatePickerType>,
  value: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
  valueFormat: String,
  onChange: eventProp<(value: string | number | string[] | number[] | null) => void>(),
  to: String,
})

export const calendarProps = buildProps({
  value: String
})

export const monthGridProps = buildProps({
  value: String
})

export interface DateCell {
  rowIndex?: number
  cellIndex?: number
  isCurrent?: boolean
  text?: string
  dayjs: Dayjs
  date: Date
  dateStr: string
}

export interface Meta {
  dateMeta: DateMeta
  extraMeta: ExtraMeta
  setDate: (date: Dateable) => void
  getDate: () => string
  getDayjs: () => Dayjs
}
export interface DateMeta {
  year: number
  month: number
  day: number
}

export interface ExtraMeta {
  allocated: boolean
}
