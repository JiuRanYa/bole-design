import { useData } from 'vitepress'
import { computed } from 'vue'

export const useToc = () => {
  const { page } = useData()

  return computed(() => page.value.headers)
}
