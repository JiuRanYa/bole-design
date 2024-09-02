import type { PropType } from 'vue'

import { booleanProps, buildProps, eventProp } from '@panda-ui/common'
import { popperProps } from '../popper/props'
import { iconProp } from '../icon/props'
import type { Labels, TimeType } from './symbol'

export const timePickerProps = buildProps({
  ...popperProps,
  visible: booleanProps,
  labels: Object as PropType<Labels>,
  value: [String, Array] as PropType<string | string[]>,
  format: String,
  hourStep: Number,
  minuteStep: Number,
  secondStep: Number,
  separator: String,
  range: booleanProps,
  needConfirm: booleanProps,
  noSuffix: booleanProps,
  prefixColor: String,
  suffix: iconProp,

  onFocus: eventProp(),
  onBlur: eventProp(),
  onChange: eventProp<(value: string | string[]) => void>(),
  onInput: eventProp<(type: TimeType, value: number) => void>(),
  onPlus: eventProp<(type: TimeType, value: number) => void>(),
  onMinus: eventProp<(type: TimeType, value: number) => void>(),
})
