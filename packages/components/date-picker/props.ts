import { PropType } from 'vue'
import { buildProps, Placement } from '@bole-design/common'

export type DatePickerType = 'static' | 'range'
export const datePickerProps = buildProps({
  placement: String as PropType<Placement>,
  transitionName: String || Function,
  presets: Object as PropType<Record<string, any>>,
  type: String as PropType<DatePickerType>
})

export const calendarProps = buildProps({
  value: String
})

export const monthGridProps = buildProps({
  value: String
})
