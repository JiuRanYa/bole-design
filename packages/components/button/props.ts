import { PropType } from 'vue'
import { booleanProps, buildProps } from '@panda-ui/common/index'

export type ButtonType =
  | 'primary'
  | 'success'
  | 'default'
  | 'error'
  | 'warning'
  | 'outline'
  | 'secondary'
  | 'ghost'

export type ButtonSize = 'large' | 'middle' | 'small'

export const buttonProps = buildProps({
  disabled: booleanProps,
  type: String as PropType<ButtonType>,
  size: String as PropType<ButtonSize>,
  icon: Object
})

export const buttonGroupProps = buildProps({
  circle: booleanProps
})
