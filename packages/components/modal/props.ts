import { booleanProps, booleanStringProps, buildProps } from '@bole-design/common'

export const modalProps = buildProps({
  active: booleanProps,
  inner: booleanProps,
  transfer: booleanStringProps
})
