import { Message, MessageHandler, MessageOptions } from './message'

export type MessageParams = MessageOptions | MessageOptions['message']

export type MessageFn = {
  (options?: MessageParams): MessageHandler
}

const message: MessageFn = (options = { inherit: false }) => {
  const close = () => {}

  return {
    close
  }
}

export default message
