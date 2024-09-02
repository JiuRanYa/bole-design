import { booleanProps, buildProps, eventProp } from '@panda-ui/common'

export const popperProps = buildProps({
  to: String,
  visible: booleanProps,
  alive: booleanProps,
  transition: String,
  onBeforeEnter: eventProp<(el: Element) => void>(),
  onEnter: eventProp<(el: Element, done: Function) => void>(),
  onAfterEnter: eventProp<(el: Element) => void>(),
  onEnterCancelled: eventProp<(el: Element) => void>(),
  onBeforeLeave: eventProp<(el: Element) => void>(),
  onLeave: eventProp<(el: Element, done: Function) => void>(),
  onAfterLeave: eventProp<(el: Element) => void>(),
  onLeaveCancelled: eventProp<(el: Element) => void>(),
})
