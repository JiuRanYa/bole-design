import { booleanProps, buildProps } from '@bole-design/common'

export const switchProps = buildProps({
  value: booleanProps,
  openIcon: Object,
  closeIcon: Object
})
