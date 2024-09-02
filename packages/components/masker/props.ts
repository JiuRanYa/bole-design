import { booleanProps, booleanStringProps, buildProps, eventProp } from '@panda-ui/common'

export const maskerProps = buildProps({
  active: booleanProps,
  inner: booleanProps,
  transitionName: String,
  maskTransition: String,
  transfer: booleanStringProps,
  closable: booleanProps,
  reverse: booleanProps,
  maskClose: booleanProps,
  onMaskClick: eventProp<(event: MouseEvent) => void>(),
  onShow: eventProp(),
  onClose: eventProp(),
  onHide: eventProp(),
})
