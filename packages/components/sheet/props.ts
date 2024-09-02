import type { Side } from '@floating-ui/dom'
import { booleanProps, buildProps, eventProp } from '@panda-ui/common'
import type { PropType } from 'vue'

export const sheetProps = buildProps({
  active: booleanProps,
  transitionName: String,
  placement: String as PropType<Side>,
  closeble: booleanProps,
  size: String,
  onShow: eventProp(),
  onClose: eventProp(),
  onHide: eventProp(),
})
