import { booleanProps, booleanStringProps, buildProps } from '@bole-design/common'

const positionType = [Number, String]

export const modalProps = buildProps({
  active: booleanProps,
  inner: booleanProps,
  transfer: booleanStringProps,
  top: positionType
})
