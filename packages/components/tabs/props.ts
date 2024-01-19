import { buildProps } from '@panda-ui/common'
import { Side } from '@panda-ui/common'
import { PropType } from 'vue'

export const tabsProps = buildProps({
  value: String,
  tabPosition: {
    type: String as PropType<Side>
  }
})
