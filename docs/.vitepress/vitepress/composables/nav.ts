import { computed, onMounted, ref } from 'vue'
import { navs } from '../../configs/nav'
import { BL_PROJECT_STORAGE } from '../tookens'

export function useNav() {
  const project = ref()

  onMounted(() => {
    project.value = localStorage.getItem(BL_PROJECT_STORAGE) as string
  })
  return computed(() => {
    if (!project.value)
      return []

    return navs[project.value]
  })
}
