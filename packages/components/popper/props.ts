import { booleanProps, buildProps } from '@panda-ui/common'

export const popperProps = buildProps({
  to: String,
  visible: booleanProps,
  alive: booleanProps,
  transition: String
})
