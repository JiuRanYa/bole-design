import { buildProps } from '@bole-design/common'
import { PropType } from 'vue'
import { MessageProps, MessageType } from './symbol'

export type MessagePlacement = 'top' | 'bottom'
export const messageTypes = ['success', 'error', 'warning', 'info'] as const
export const messageProps = buildProps({
  message: String,
  type: {
    type: String as PropType<MessageType>,
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
  },
  icon: {
    type: Object as PropType<Record<string, any> | (() => any)>
  },
  iconColor: String,
  iconStyle: {
    type: String as PropType<Record<string, any>>
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
