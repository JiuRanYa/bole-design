import { PropType } from 'vue'
import { buildProps, Placement } from '@bole-design/common'

export const datePickerProps = buildProps({
  placement: String as PropType<Placement>
})
