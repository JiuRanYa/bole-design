import { buildProps } from '@panda-ui/common/props'
import { booleanProps } from '@panda-ui/common'
import { PropType } from 'vue'
import { ButtonSize } from '../button/props'

export type InputType = 'default' | 'secondary'
export const inputProps = buildProps({
  value: String,
  debounce: booleanProps,
  placeholder: String,
  onChange: Function as PropType<(value: String) => void>,
  type: String as PropType<InputType>,
  autofocus: booleanProps,
  disabled: booleanProps,
  readonly: booleanProps,
  size: String as PropType<ButtonSize>
})
