import type { PropType } from 'vue'
import { booleanProps, buildProps } from '@panda-ui/common'

export const checkboxProps = buildProps({
  value: booleanProps,
  label: String,
  indeterminate: booleanProps,
  onChange: Function as PropType<(value: boolean) => void>,
})
