import type { AppContext, ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { CircleCheck, CircleExclamation, CircleInfo, CircleXmark } from '@panda-ui/icons'
import type { MessagePlacement, messageProps } from './props'
import type { MessageHandler } from './method'

export interface MessageFn {
  (options?: FuzzyOptions, appContext?: null | AppContext): MessageHandler
}

export interface MessageOptions extends Record<string, any> {
  message?: string
  appendTo?: HTMLElement
}

export type FuzzyOptions = string | MessageOptions

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'custom'
export const messageTypes = ['success', 'info', 'warning', 'error'] as const

export interface MessageInstance extends ComponentPublicInstance {
  placement: MessagePlacement
}

export type MessageProps = ExtractPropTypes<typeof messageProps>

export const TypeComponentsMap = {
  success: CircleCheck,
  info: CircleInfo,
  error: CircleXmark,
  warning: CircleExclamation,
  custom: '',
}

export type MessageTypedFn = (
  options?: FuzzyOptions,
  appContext?: null | AppContext
) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}
