import { useData } from 'vitepress'
import { useProject } from './project'
import { computed, onMounted, ref } from 'vue'
import { siderbarsConfig } from '@/.vitepress/configs/sidebar'
import { BL_PROJECT_STORAGE } from '../tookens'

export type SidebarItem = {
  text: string
  link: string
}

export type SidebarConfig = SidebarItem[]

export type Sidebar = {
  [key: string]: SidebarConfig
}
export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`
}

function getSidebarConfig(path: string, project: string) {
  if (!project) return

  return siderbarsConfig[project][path]
}
export function useSidebar() {
  const project = ref()
  const { page } = useData()
  const path = computed(() => page.value.filePath.split('/')[2])

  const sidebars = computed(() => {
    if (page.value.frontmatter.hasSidebar === false) return []

    const sidebars = getSidebarConfig(path.value, project.value)

    return sidebars
  })

  onMounted(() => {
    project.value = localStorage.getItem(BL_PROJECT_STORAGE)
  })

  // two level is start of project
  return {
    sidebars,
    hasSidebar: computed(() => path.value !== 'index.md')
  }
}
