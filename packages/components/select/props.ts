import { Placement } from '@floating-ui/dom'
import { booleanNumberProp, booleanProps, buildProps, eventProp } from '@panda-ui/common'
import { PropType } from 'vue'
import { SelectRawOption, SelectValue } from './.symbol'

export const selectProps = buildProps({
  value: [String, Number, Array] as PropType<SelectValue>,
  visible: booleanProps,
  transitionName: String,
  listClass: Array as PropType<string[]>,
  options: {
    type: Array as PropType<SelectRawOption[]>,
    required: true
  },
  fitPopper: booleanNumberProp,
  placement: String as PropType<Placement>,
  to: String,
  creatable: booleanProps,
  clearable: booleanProps,
  filterable: booleanProps,
  defaultFirstOption: booleanProps,
  placeholder: String,
  onChange:
    eventProp<(newValue: SelectValue | undefined, oldValue: SelectValue | undefined) => void>()
})
