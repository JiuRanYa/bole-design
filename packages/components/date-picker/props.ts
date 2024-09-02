import type { PropType } from 'vue'
import type { Dateable, Placement } from '@panda-ui/common'
import { buildProps, eventProp } from '@panda-ui/common'
import type { Dayjs } from 'dayjs'
import type { TimeType } from '../time-picker/symbol'
import { datePickerSharedProps } from './shared'

export interface OriginDate {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}
export type DatePickerType = 'static' | 'range' | 'dateTime' | 'dateTimeRange'
export type DatePickerTyping = 'fixed' | 'since' | 'last'
export type DateTimeType = 'year' | 'month' | 'day' | TimeType

export const datePickerPanelProps = buildProps({
  ...datePickerSharedProps,
})

export const datePickerProps = buildProps({
  ...datePickerSharedProps,
  placement: String as PropType<Placement>,
  transitionName: String || Function,
  presets: Object as PropType<Record<string, Dateable>>,
  value: [Number, String, Date, Array, Object] as PropType<Dateable | Dateable[]>,
  valueFormat: String,
  format: String,
  onChange: eventProp<(value: string | number | string[] | number[] | null) => void>(),
  to: String,
  timezone: String,
})

export const calendarProps = buildProps({
  value: String,
})

export const monthGridProps = buildProps({
  value: String,
})

export interface DateCell {
  rowIndex?: number
  cellIndex?: number
  isCurrent?: boolean
  text?: string
  dayjs: Dayjs
  date?: Date
  dateStr: string
}

export interface Meta {
  enabled: Record<keyof DateMeta, boolean>
  dateMeta: DateMeta
  extraMeta: ExtraMeta
  setDate: (date: Dateable) => void
  getDate: () => Date
  getDayjs: () => Dayjs

  setDateMeta: (meta: Partial<DateMeta>) => void
}

export type MetaType = 'start' | 'end'

export interface DateMeta {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export interface ExtraMeta {
  allocated: boolean
}
