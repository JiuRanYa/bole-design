import type { Side } from '@panda-ui/common'
import { buildProps, eventProp } from '@panda-ui/common'
import type { PropType } from 'vue'

export interface TabTriggerEmitState {
  name: string
  disabled: boolean
}

export const tabsProps = buildProps({
  value: String,
  tabPosition: {
    type: String as PropType<Side>,
  },
  onTabClick: eventProp<(state: TabTriggerEmitState) => void>(),
})
