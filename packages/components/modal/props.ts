import { booleanProps, booleanStringProps, buildProps, eventProp } from '@panda-ui/common'

const positionType = [Number, String]

export const modalProps = buildProps({
  active: booleanProps,
  inner: booleanProps,
  transfer: booleanStringProps,
  top: positionType,
  transitionName: String,
  width: String,
  height: String,
  reverseBackdrop: booleanProps,
  onShow: eventProp(),
  onClose: eventProp(),
  onHide: eventProp(),
  dialogClass: String,
})
