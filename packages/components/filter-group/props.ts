import { booleanProps, buildProps } from '@panda-ui/common'
import type { PropType } from 'vue'
import type { RuleData, RuleOption } from './types'

export const filterGroupProps = buildProps({
  ruleDataGroup: Object as PropType<RuleData | null>,
  readonly: booleanProps,
  ruleOptions: Array as PropType<RuleOption[]>,
  onChange: {
    type: Function as PropType<(value: RuleData | null) => void>,
    default: () => { },
  },
})
