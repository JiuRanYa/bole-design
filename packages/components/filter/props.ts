import { buildProps } from '@panda-ui/common'
import { PropType } from 'vue'
import { RuleOption, RuleData } from './types'

export const basicFilterPanelProps = {
  isAddActive: {
    type: Boolean,
    default: false
  },
  currentFilterValue: {
    type: [String, Number, Array, Boolean] as PropType<string | number | any[] | boolean>,
    required: true,
    default: ''
  }
}

export const filterDropdownProps = {
  ruleOptions: {
    type: Array as PropType<RuleOption[]>,
    default: []
  }
}

export const filterProps = buildProps({
  rules: Array as PropType<RuleData[]>,
  visible: Boolean,
  readonly: Boolean,
  ruleOptions: { type: Array as PropType<RuleOption[]>, default: [] }
})
