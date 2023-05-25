import { computed } from 'vue'
import { useRoute } from 'vitepress'

export const defaultProject = 'Bole Design'

export const useProject = () => {
  const route = useRoute()
  return computed(() => {
    const path = route?.data.relativePath
    let project: string
    let paths = path.split('/')
    paths.shift()

    if (path?.includes('/')) {
      const pro = paths.shift()
      project = pro ?? defaultProject
    } else {
      project = defaultProject
    }
    return project
  })
}
