import { ComponentSize, booleanProps, buildProps } from '@panda-ui/common'
import { PropType } from '@vue/runtime-core'

export const switchProps = buildProps({
  value: booleanProps,
  openIcon: Object,
  closeIcon: Object,
  size: [Number, String] as PropType<number | ComponentSize>
})
