import { Side, booleanProps, buildProps } from '@bole-design/common'
import { PropType } from 'vue'

export const tabsListProps = buildProps({
  customStyle: booleanProps,
  tabPosition: {
    type: String as PropType<Side>
  }
})
