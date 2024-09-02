import { buildProps } from '@panda-ui/common/props'
import { booleanProps, eventProp } from '@panda-ui/common'
import type { PropType } from 'vue'
import type { ComponentSize } from '../button/props'

export type InputType = 'default' | 'secondary'
export const inputProps = buildProps({
  value: String,
  debounce: booleanProps,
  placeholder: String,
  autocomplete: booleanProps,
  onChange: Function as PropType<(value: string) => void>,
  onBlur: eventProp<(value: string, event: FocusEvent) => void>(),
  type: String as PropType<InputType>,
  autofocus: booleanProps,
  disabled: booleanProps,
  readonly: booleanProps,
  size: String as PropType<ComponentSize>,
})
