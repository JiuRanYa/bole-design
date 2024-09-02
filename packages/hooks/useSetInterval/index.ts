import { onBeforeUnmount } from 'vue'

export function useSetInterval() {
  const timer: Record<string, any> = {}

  onBeforeUnmount(() => {
    Object.keys(timer).forEach((key) => {
      clearInterval(timer[key])
    })
  })

  return { timer }
}
