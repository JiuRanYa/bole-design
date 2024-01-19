import { booleanProps, buildProps } from '@panda-ui/common'
import { PropType } from '@vue/runtime-core'

export const checkboxProps = buildProps({
  value: booleanProps,
  label: String,
  onChange: Function as PropType<(value: boolean) => void>
})
