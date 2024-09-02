import { useData } from 'vitepress'
import { computed } from 'vue'

export function useToc() {
  const { page } = useData()

  return computed(() => page.value.headers)
}
