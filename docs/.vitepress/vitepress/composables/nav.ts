import { computed } from 'vue'
import { navs } from '../../configs/nav'
import { useProject } from './project'

export const useNav = () => {
  const project = useProject()
  const nav = navs[project.value]

  return computed(() => nav)
}
