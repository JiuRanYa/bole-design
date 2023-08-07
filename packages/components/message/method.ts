import { FuzzyOptions, MessageFn, MessageProps } from './symbol'
import { MessagePlacement } from './props'
import { Mutable } from '@bole-design/common'
import { AppContext, ComponentInternalInstance, VNode, createVNode, render } from 'vue'
import MessageComp from './Message.vue'

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

let seed = 1

function createMessage({ appendTo }, appContext?: AppContext | null) {
  const id = `bl-message-${seed++}`
  const props = {}

  const vnode = createVNode(MessageComp, props)
  console.log(vnode)
  const vm = vnode.component!

  const container = document.createElement('div')

  const handler: MessageHandler = {
    close: () => {
      // vm.exposed!.visible.value = false
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

  return instance
}

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void
}

export type MessageTypedFn = (
  options?: FuzzyOptions,
  appContext?: null | AppContext
) => MessageHandler

const message: MessageFn & { _context: AppContext | null } = (options, context) => {
  const instance = createMessage(
    {
      appendTo: document.body
    },
    context
  )

  return instance.handler
}

export default message
