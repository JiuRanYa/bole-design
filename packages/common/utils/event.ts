import { MaybeArray } from '../types'

export function emitEvent<A extends any[]>(handlers: MaybeArray<(...args: A) => void>, ...args: A) {
  if (Array.isArray(handlers)) {
    for (let i = 0, len = handlers.length; i < len; ++i) {
      const handler = handlers[i]

      typeof handler === 'function' && handler(...args)
    }
  } else {
    typeof handlers === 'function' && handlers(...args)
  }
}
