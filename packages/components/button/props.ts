import { PropType } from 'vue'
import { booleanProps, buildProps } from '@bole-design/common/index'

export type ButtonType = 'primary'
export type ButtonSize = 'large' | 'middle'

export const buttonProps = buildProps({
  disable: booleanProps,
  type: String as PropType<ButtonType>,
  size: String as PropType<ButtonSize>,
})
