import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const defaultProject = 'bole-design'

export const useProject = () => {
  const route = useRoute()

  return computed(() => {
    // the first part of the first slash
    const path = route?.data?.relativePath
    console.log(route)
    let project: string

    if (path?.includes('/')) {
      project = path.split('/').shift()! || defaultProject
    } else {
      project = defaultProject
    }
    return project
  })
}
