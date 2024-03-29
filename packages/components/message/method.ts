import { FuzzyOptions, Message, MessageFn, MessageProps, messageTypes } from './symbol'
import { defaultProps, MessagePlacement } from './props'
import { isClient, isString, Mutable } from '@panda-ui/common'
import { AppContext, ComponentInternalInstance, VNode, createVNode, render } from 'vue'
import MessageComp from './message.vue'
import { instances } from './instance'

export type ManagerOptions = { duration?: number; placement?: MessagePlacement } & Record<
  string,
  unknown
>
export type MessageContext = {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: Mutable<MessageProps>
}

export interface MessageHandler {
  close: () => void
}

export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  appendTo: HTMLElement
}

let seed = 1

export const closeMessage = (instance: MessageContext) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}
function createMessage(
  { appendTo, ...options }: MessageParamsNormalized,
  appContext?: AppContext | null
) {
  const id = `bl-message-${seed++}`
  const container = document.createElement('div')
  const userOnClose = options.onClose

  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.()
      closeMessage(instance)
    },
    onDestroy: () => {
      // clear the vnode
      render(null, container)
    }
  }

  const vnode = createVNode(MessageComp, props)
  vnode.appContext = appContext || message._context

  const handler: MessageHandler = {
    close: () => {
      vm.exposed!.visible.value = false
    }
  }

  render(vnode, container)
  appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props
  }

  return instance
}

function normalizeOptions(options: FuzzyOptions) {
  const userOptions: FuzzyOptions = isString(options) ? { message: options } : options

  const normalized = {
    ...defaultProps,
    ...userOptions
  }

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  }

  return normalized
}

const message: MessageFn & Partial<Message> & { _context: AppContext | null } = (
  options = {},
  context
) => {
  if (!isClient) return { close: () => undefined }

  const normalizedOptions = normalizeOptions(options)

  const instance = createMessage(
    {
      ...normalizedOptions
    },
    context
  )
  instances.push(instance)

  return instance.handler
}

messageTypes.forEach(type => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options)
    return message({ ...normalized, type }, appContext)
  }
})

export default message
