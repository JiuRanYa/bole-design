import { ref } from 'vue'

import type { Ref } from 'vue'
import { useEventListener } from '../useEventListener'

export function useHover(wrapper: Ref<HTMLElement | null | undefined> = ref(null)) {
  const isHover = ref(false)

  useEventListener(wrapper, 'mouseenter', enterWrapper)
  useEventListener(wrapper, 'mouseleave', leaveWrapper)

  function enterWrapper() {
    isHover.value = true
  }

  function leaveWrapper() {
    isHover.value = false
  }

  return { wrapper, isHover }
}
