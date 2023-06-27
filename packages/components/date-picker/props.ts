import { PropType } from 'vue'
import { buildProps, Dateable, Placement } from '@bole-design/common'
import type { Dayjs } from 'dayjs'

export type OriginDate = {
  year: number
  month: number
  day: number
}
export type DatePickerType = 'static' | 'range'

export const datePickerProps = buildProps({
  placement: String as PropType<Placement>,
  transitionName: String || Function,
  presets: Object as PropType<Record<string, Dateable>>,
  type: String as PropType<DatePickerType>,
  value: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
	valueFormat: String
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
}
export interface DateMeta {
  year: number
  month: number
  day: number
}

export interface ExtraMeta {
  allocated: boolean
}
