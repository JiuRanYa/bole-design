import { buildProps } from '@bole-design/common'
import { Side } from '@bole-design/common'
import { PropType } from 'vue'

export const tabsProps = buildProps({
  value: String,
  tabPosition: {
    type: String as PropType<Side>
  }
})
