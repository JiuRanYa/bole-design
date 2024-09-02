import { computed } from 'vue'

export const defaultProject = 'panda-ui'

export function useProject() {
  const project = defaultProject

  return computed(() => {
    return project
  })
}
