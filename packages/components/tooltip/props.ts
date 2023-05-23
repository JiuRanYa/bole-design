import { buildProps, booleanStringProp, Placement } from '@bole-design/common'
import { PropType } from 'vue'

export const toolTipProps = buildProps({
  content: String,
  wrap: booleanStringProp,
  placement: String as PropType<Placement>
})
