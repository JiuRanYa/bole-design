import { shallowReactive } from 'vue'
import type { MessageContext } from './method'

export const instances: MessageContext[] = shallowReactive([])

export function getInstance(id: string) {
  const idx = instances.findIndex(instance => instance.id === id)
  const current = instances[idx]
  let prev: MessageContext | undefined
  if (idx > 0)
    prev = instances[idx - 1]

  return { current, prev }
}

export function getLastOffset(id: string): number {
  const { prev } = getInstance(id)
  if (!prev)
    return 0
  return prev.vm.exposed!.bottom.value
}
export function getOffsetOrSpace(id: string, offset: number) {
  const idx = instances.findIndex(instance => instance.id === id)
  return idx > 0 ? 20 : offset
}
