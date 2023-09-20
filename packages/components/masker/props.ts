import { booleanProps, booleanStringProps, buildProps, eventProp } from '@bole-design/common'

export const maskerProps = buildProps({
  active: booleanProps,
  inner: booleanProps,
  transitionName: String,
  transfer: booleanStringProps,
  closable: booleanProps,
  onMaskClick: eventProp<(event: MouseEvent) => void>()
})
