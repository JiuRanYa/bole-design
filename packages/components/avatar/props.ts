import type { ComponentSize } from '@panda-ui/common'
import { booleanProps, buildProps } from '@panda-ui/common'
import type { PropType } from 'vue'

export const avatarProps = buildProps({
  src: String,
  circle: booleanProps,
  icon: Object,
  alt: String,
  size: [Number, String] as PropType<number | ComponentSize>,
  iconScale: Number,
})
