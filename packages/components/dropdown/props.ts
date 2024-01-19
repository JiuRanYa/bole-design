import { Placement, booleanProps, buildProps } from '@panda-ui/common'
import { PropType } from 'vue'

export type DropdownTrigger = 'hover' | 'click' | 'custom'

export const dropdownProps = buildProps({
  visible: booleanProps,
  placement: String as PropType<Placement>,
  transfer: booleanProps,
  transitionName: String,
  trigger: String as PropType<DropdownTrigger>
})
