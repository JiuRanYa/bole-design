import { PropType } from 'vue'
import { DatePickerTyping } from './props'
import { buildProps } from '@bole-design/common'

export const datePickerSharedProps = buildProps({
  typing: {
    type: String as PropType<DatePickerTyping>,
    required: false
  }
})
