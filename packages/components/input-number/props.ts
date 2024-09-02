import type { ComponentSize } from '@panda-ui/common'
import { booleanProps, buildProps, eventProp } from '@panda-ui/common'
import type { PropType } from 'vue'

export type ControlPosition = 'right'

export const inputNumberProps = buildProps({
  value: Number,
  debounce: booleanProps,
  disabled: booleanProps,
  precision: Number,
  placeholder: String,
  min: Number,
  max: Number,
  step: Number,
  autofocus: booleanProps,
  autocomplete: booleanProps,
  size: String as PropType<ComponentSize>,
  name: String,
  formatter: Function as PropType<(value: number) => number | string>,
  parser: Function as PropType<(value: number) => number | string>,
  onInput: eventProp<(value: number) => void>(),
  onChange: eventProp<(value: number) => void>(),
  controlPosition: String as PropType<ControlPosition>,
  controlAttrs: Object as PropType<Record<string, any>>,
  sync: booleanProps,
})
