import { Side, booleanProps, buildProps } from '@panda-ui/common'
import { PropType } from 'vue'

export const tabsListProps = buildProps({
  customStyle: booleanProps,
  tabPosition: {
    type: String as PropType<Side>
  }
})
