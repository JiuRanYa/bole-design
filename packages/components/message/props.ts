import { buildProps } from '@panda-ui/common'
import { PropType } from 'vue'
import { MessageProps, MessageType } from './symbol'

export const defaultProps: MessageProps = Object.freeze({
  inherit: false,
  message: '',
  title: '',
  type: 'info',
  placement: 'top',
  duration: 2000,
  onClose: () => {},
  id: '',
  offset: 20,
  repeatNum: 1
})

export type MessagePlacement = 'top' | 'bottom'
export const messageTypes = ['success', 'error', 'warning', 'info', 'custom'] as const
export const messageProps = buildProps({
  id: {
    type: String
  },
  message: String,
  title: String,
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
  },
  offset: {
    type: Number
  },
  repeatNum: Number
})
