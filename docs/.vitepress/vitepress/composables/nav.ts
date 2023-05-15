import { computed } from 'vue'
import { useData } from 'vitepress'
import { navs } from '../../configs/nav'

export const useNav = () => {
  const { theme } = useData()

  return computed(() => {})
}
