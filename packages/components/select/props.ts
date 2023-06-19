import { booleanNumberProp, booleanProps, buildProps } from '@bole-design/common'
import { PropType } from 'vue'
import { SelectRawOption, SelectValue } from './.symbol'

export const selectProps = buildProps({
  value: [String, Number, Array] as PropType<SelectValue>,
  visible: booleanProps,
  transitionName: String,
  listClass: Array as PropType<string[]>,
  options: Array as PropType<SelectRawOption[]>,
  fitPopper: booleanNumberProp
})
