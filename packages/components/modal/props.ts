import { booleanProps, booleanStringProps, buildProps } from '@panda-ui/common'

const positionType = [Number, String]

export const modalProps = buildProps({
  active: booleanProps,
  inner: booleanProps,
  transfer: booleanStringProps,
  top: positionType,
  transitionName: String,
  width: String,
  height: String,
  reverseBackdrop: booleanProps
})
