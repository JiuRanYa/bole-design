import { PropType } from 'vue'
import { DatePickerTyping } from './props'
import { buildProps } from '@panda-ui/common'

export const datePickerSharedProps = buildProps({
  typing: {
    type: String as PropType<DatePickerTyping>,
    required: false
  }
})
