import { booleanProps, buildProps } from '@bole-design/common'
import { PropType } from 'vue'

export const switchProps = buildProps({
  value: booleanProps,
  openIcon: Object,
  closeIcon: Object
})
