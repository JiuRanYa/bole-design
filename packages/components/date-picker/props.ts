import { PropType } from 'vue'
import { buildProps, Placement } from '@bole-design/common'

export const datePickerProps = buildProps({
  placement: String as PropType<Placement>,
  transitionName: String || Function
})

export const calendarProps = buildProps({
  value: String
})

export const monthGridProps = buildProps({
  value: String
})
