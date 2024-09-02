import { buildProps } from '@panda-ui/common'
import type { PropType } from 'vue'
import type { ComponentSize } from '../button/props'

export type TagType = 'success' | 'secondary' | 'error' | 'warning'
export const tagProps = buildProps({
  type: {
    type: String as PropType<TagType>,
  },
  size: String as PropType<ComponentSize>,
})
