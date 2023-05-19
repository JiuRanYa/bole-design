import { useData } from 'vitepress'
import { useProject } from './project'
import { computed } from 'vue'

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

function getSidebarConfig(sidebars: Sidebar, path: string): any {
  const project = useProject()

  const prefix = `/projects/${project.value}`

  path = ensureStartingSlash(path)
  for (const dir in sidebars) {
    if (path.startsWith(`${prefix}/${dir}`)) {
      console.log(sidebars[dir])
      return sidebars[dir]
    }
  }
  return []
}
export function useSidebar() {
  const { site, page } = useData()

  const sidebars = computed(() => {
    if (page.value.frontmatter.hasSidebar === false) return []

    const sidebars = getSidebarConfig(site.value.themeConfig.sidebars, page.value.relativePath)

    return sidebars
  })

  return {
    sidebars,
    hasSidebar: computed(() => sidebars.value.length > 0)
  }
}
