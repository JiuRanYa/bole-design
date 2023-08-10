import { AppContext, ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { MessagePlacement, messageProps } from './props'
import { MessageHandler } from './method'
import { CircleCheck, CircleExclamation, CircleInfo, CircleXmark } from '@bole-design/icons'

export interface MessageFn {
  (options?: FuzzyOptions, appContext?: null | AppContext): MessageHandler
}

export interface MessageOptions extends Record<string, any> {
  message?: string
  appendTo?: HTMLElement
}

export type FuzzyOptions = string | MessageOptions

export type MessageType = 'info' | 'success' | 'warning' | 'error'

export interface MessageInstance extends ComponentPublicInstance {
  placement: MessagePlacement
}

export type MessageProps = ExtractPropTypes<typeof messageProps>

export const TypeComponentsMap = {
  success: CircleCheck,
  info: CircleInfo,
  error: CircleXmark,
  warning: CircleExclamation
}
