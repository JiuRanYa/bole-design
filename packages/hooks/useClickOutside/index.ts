import { ref, unref } from 'vue'
import type { Ref } from 'vue'
import { useEventListener } from '../useEventListener'
import { MaybeElementRef, isClient } from '@bole-design/common'

type Fn = () => void

type ClickoutSideOptions = {
  ignore?: (MaybeElementRef | string)[]
}

export function useClickOutside(
  handler: (event?: MouseEvent) => void,
  target: Ref<HTMLElement | null | undefined> = ref(null),
  options: ClickoutSideOptions = {}
) {
  const { ignore = [] } = options
  let shouldListen = true

  const listener = (event: PointerEvent) => {
    if (!target.value || target.value.contains(event.target as HTMLElement)) return

    if (!shouldListen) return

    handler(event)
  }

  const shouldIgnore = (event: PointerEvent) => {
    return ignore.some(target => {
      if (isClient && typeof target === 'string') {
        return Array.from(window.document.querySelectorAll(target)).some(
          el => el === event.target || event.composedPath().includes(el)
        )
      } else {
        const el = unref(target)
        return (el && el === event.target) || event.composedPath().includes(el)
      }
    })
  }

  const cleanup = [
    isClient && useEventListener(document, 'click', listener),

    isClient &&
      useEventListener(
        window,
        'pointerdown',
        e => {
          const el = target.value
          if (el) shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e)
        },
        { passive: true }
      )
  ] as Fn[]

  const stop = () => cleanup.forEach(fn => fn())

  return stop
}
