import { buildProps } from '@bole-design/common'
import { PropType } from 'vue'
import { MessageProps } from './symbol'

export type MessagePlacement = 'top' | 'bottom'
export const messageTypes = ['success', 'error', 'warning', 'info'] as const
export const messageProps = buildProps({
  message: String,
  type: {
    type: String,
    values: messageTypes
  },
  placement: {
    type: String as PropType<MessagePlacement>
  },
  onClose: {
    type: Function
  },
  duration: {
    type: Number
  }
})

export const defaultProps: MessageProps = Object.freeze({
  inherit: false,
  message: '',
  type: 'info',
  placement: 'top',
  duration: 2000,
  onClose: () => {}
})
