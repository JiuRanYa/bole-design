import { ExtractPropTypes } from 'vue'
import { messageProps } from './props'

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void
}

export type MessageOptions = ExtractPropTypes<typeof messageProps>

export type MessageOptionsWithType = Omit<MessageOptions, 'type'>

export type MessageParamsWithType = MessageOptionsWithType | MessageOptions['message']

export type MessageTypedFn = (options?: MessageParamsWithType) => MessageHandler

export interface Message {
  success: MessageTypedFn
}
