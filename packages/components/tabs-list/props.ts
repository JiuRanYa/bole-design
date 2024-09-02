import type { Side } from '@panda-ui/common'
import { booleanProps, buildProps } from '@panda-ui/common'
import type { PropType } from 'vue'

export const tabsListProps = buildProps({
  customStyle: booleanProps,
  tabPosition: {
    type: String as PropType<Side>,
  },
})
