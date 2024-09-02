import type { PropType } from 'vue'
import { buildProps } from '@panda-ui/common'
import type { DatePickerType, DatePickerTyping } from './props'

export const datePickerSharedProps = buildProps({
  type: String as PropType<DatePickerType>,
  typing: {
    type: String as PropType<DatePickerTyping>,
    required: false,
  },
})
