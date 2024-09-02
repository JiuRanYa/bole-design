import { booleanProps, buildProps } from '@panda-ui/common'
import type { PropType } from 'vue'
import type { RuleData, RuleOption } from './types'

export const basicFilterPanelProps = {
  isAddActive: {
    type: Boolean,
    default: false,
  },
  currentFilterValue: {
    type: null,
    required: true,
    default: '',
  },
}

export const filterDropdownProps = {
  ruleOptions: {
    type: Array as PropType<RuleOption[]>,
    default: [],
  },
}

export const filterProps = buildProps({
  ruleData: Object as PropType<RuleData | null>,
  readonly: booleanProps,
  ruleOptions: { type: Array as PropType<RuleOption[]>, default: [] },
  onChange: {
    type: Function as PropType<(value: RuleData | null) => void>,
    default: () => {},
  },
  transitionName: String,
  to: String,
})
