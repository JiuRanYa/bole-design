import { buildProps } from '@bole-design/common'
import { PropType } from 'vue'

export const messageTypes = ['success', 'error', 'warning', 'message'] as const
export const messageProps = buildProps({
  message: String,
  type: {
    type: String,
    values: messageTypes
  },
  placement: {
    type: String as PropType<MessagePlacement>
  }
})

export type MessagePlacement = 'top' | 'bottom'
