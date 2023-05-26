import { buildProps, booleanStringProp, Placement, booleanProps } from '@bole-design/common'
import { PropType } from 'vue'

export type TriggerType = 'click' | 'hover'

export const toolTipProps = buildProps({
  content: String,
  wrap: booleanStringProp,
  placement: String as PropType<Placement>,
  transfer: booleanProps,
  reverse: booleanProps,
  visible: booleanProps,
  trigger: String as PropType<TriggerType>,
  disabled: booleanProps,
  mouseEnterDelay: Number,
  mouseLeaveDelay: Number
})
