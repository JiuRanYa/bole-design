import { FuzzyOptions, MessageFn, MessageProps } from './symbol'
import { defaultProps, MessagePlacement } from './props'
import { isClient, isString, Mutable } from '@bole-design/common'
import { AppContext, ComponentInternalInstance, VNode, createVNode, render } from 'vue'
import MessageComp from './message.vue'

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

export type MessageTypedFn = (
  options?: FuzzyOptions,
  appContext?: null | AppContext
) => MessageHandler

export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  appendTo: HTMLElement
}

let seed = 1

function createMessage(
  { appendTo, ...options }: MessageParamsNormalized,
  appContext?: AppContext | null
) {
  const id = `bl-message-${seed++}`
  const container = document.createElement('div')

  const props = {
    ...options,
    onDestroy: () => {
      // clear the vnode
      render(null, container)
    }
  }

  const vnode = createVNode(MessageComp, props)
  const vm = vnode.component!
  vnode.appContext = appContext || message._context

  const handler: MessageHandler = {
    close: () => {
      vm.exposed!.visible.value = false
    }
  }

  render(vnode, container)
  appendTo.appendChild(container.firstElementChild!)

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props
  }
  console.log(instance)

  return instance
}

function normalizeOptioons(options: FuzzyOptions) {
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

const message: MessageFn & { _context: AppContext | null } = (options = {}, context) => {
  console.log('exec')
  if (!isClient) return { close: () => undefined }

  const normalizedOptions = normalizeOptioons(options)

  const instance = createMessage(
    {
      ...normalizedOptions
    },
    context
  )

  return instance.handler
}

export default message
