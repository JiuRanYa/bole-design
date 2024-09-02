import type { Placement } from '@panda-ui/common'
import { booleanProps, booleanStringProps, buildProps } from '@panda-ui/common'
import type { PropType } from 'vue'

export type DropdownTrigger = 'hover' | 'click' | 'custom'

export const dropdownProps = buildProps({
  visible: booleanProps,
  placement: String as PropType<Placement>,
  transfer: booleanStringProps,
  transitionName: String,
  trigger: String as PropType<DropdownTrigger>,
})
