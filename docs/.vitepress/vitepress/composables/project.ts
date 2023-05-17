import { computed } from 'vue'
import { useRoute } from 'vitepress'

export const defaultProject = 'bole-design'

export const useProject = () => {
  const route = useRoute()
  return computed(() => {
    const path = route?.data.relativePath
    let project: string
    let paths = path.split('/')
    paths.shift()

    if (path?.includes('/')) {
      // the sec relativePath is project
      project = (!paths.shift() || defaultProject) as string
    } else {
      project = defaultProject
    }
    return project
  })
}
