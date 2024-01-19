import { buildProps } from '@panda-ui/common'
import { PropType } from 'vue'
import { ButtonSize } from '../button/props'

export type TagType = 'success' | 'secondary' | 'error' | 'warning'
export const tagProps = buildProps({
  type: {
    type: String as PropType<TagType>
  },
	size: String as PropType<ButtonSize>
})
