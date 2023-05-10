import { computed, ref } from 'vue'

export const defaultProject = 'bole-design'

export let project = ref(defaultProject)

export const getProject = () => {
  return project
}

export const changeProject = (proj: string) => {
  project.value = proj
}
