import { booleanProps, booleanStringProps, buildProps } from '@bole-design/common'

export const maskerProps = buildProps({
  active: booleanProps,
  inner: booleanProps,
  transitionName: String,
  transfer: booleanStringProps
})
