import { AppContext, ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { MessagePlacement, messageProps } from './props'
import { MessageHandler } from './method'

export interface MessageFn {
  (options?: FuzzyOptions, appContext?: null | AppContext): MessageHandler
}

export interface MessageOptions extends Record<string, any> {
  message?: string
}

export type FuzzyOptions = string | MessageOptions

export type MessageType = 'info' | 'success' | 'warning' | 'error'

export interface MessageInstance extends ComponentPublicInstance {
  placement: MessagePlacement
}

export type MessageProps = ExtractPropTypes<typeof messageProps>
