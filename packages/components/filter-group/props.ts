import { buildProps } from '@panda-ui/common'
import { PropType } from 'vue'
import { RuleOption, RuleData } from './types'

export const filterGroupProps = buildProps({
  rulesGroup: Array as PropType<RuleData[][]>,
  visible: Boolean,
  readonly: Boolean,
  ruleOptions: Array as PropType<RuleOption[]>
})
