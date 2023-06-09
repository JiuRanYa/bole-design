import { PropType } from 'vue'
import { buildProps, Dateable, Placement } from '@bole-design/common'

export type OriginDate = {
  year: number
  month: number
  day: number
}
export type DatePickerType = 'static' | 'range'

export const datePickerProps = buildProps({
  placement: String as PropType<Placement>,
  transitionName: String || Function,
  presets: Object as PropType<Record<string, Dateable[]>>,
  type: String as PropType<DatePickerType>,
  value: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>
})

export const calendarProps = buildProps({
  value: String
})

export const monthGridProps = buildProps({
  value: String
})
