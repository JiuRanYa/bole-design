import { computed } from 'vue'

export const defaultProject = 'panda-ui'

export const useProject = () => {
  const project = defaultProject

  return computed(() => {
    return project
  })
}
