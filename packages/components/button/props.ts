import { PropType } from 'vue'
import { booleanProps, buildProps } from '@bole-design/common/index'

export type ButtonType = 'primary' | 'success' | 'default' | 'error' | 'info' | 'warning'

export type ButtonSize = 'large' | 'middle' | 'small'

export const buttonProps = buildProps({
  disable: booleanProps,
  type: String as PropType<ButtonType>,
  size: String as PropType<ButtonSize>,
  icon: Object
})

export const buttonGroupProps = buildProps({
  circle: booleanProps
})
