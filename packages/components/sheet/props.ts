import { Side } from '@floating-ui/dom'
import { booleanProps, buildProps } from '@panda-ui/common'
import { PropType } from 'vue'

export const sheetProps = buildProps({
  active: booleanProps,
  transitionName: String,
  placement: String as PropType<Side>,
  closeble: booleanProps,
  size: String
})
