import { booleanProps, buildProps, ComponentSize } from '@panda-ui/common'
import { PropType } from 'vue'

export const avatarProps = buildProps({
  src: String,
  circle: booleanProps,
  icon: Object,
  alt: String,
  size: [Number, String] as PropType<number | ComponentSize>,
  iconScale: Number
})
