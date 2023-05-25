import { booleanProps, buildProps } from '@bole-design/common'

export const popperProps = buildProps({
  to: String,
  visible: booleanProps,
  transition: String
})
