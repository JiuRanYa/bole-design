import { useData } from 'vitepress'
import { useProject } from './project'
import { computed } from 'vue'

type SidebarItem = {
  text: string
  link: string
}

type SidebarConfig = SidebarItem[]

type Sidebar =
  | {
      [key: string]: SidebarConfig
    }
  | false
  | 'auto'

function getSidebarConfig(sidebar: Sidebar) {
  const project = useProject()

  const keys = Object.keys(sidebar)

  const result = JSON.parse(JSON.stringify(sidebar))

  for (const key of keys) {
    const items = sidebar[key]

    items.forEach((item: any) => {
      const children: SidebarItem[] = item.children
      if (children.length) {
        children.forEach(child => {
          child.link = `/projects/${project}/${child.link}`
        })
      }
    })
  }

  return result
}
export function useSidebar() {
  const { site, page } = useData()

  const sidebar = computed(() => {
    if (page.value.frontmatter.hasSiderbar === false) return []

    const sidebars = getSidebarConfig(site.value.themeConfig.siderbars)

    console.log(sidebars)

    return sidebars
  })

  return {
    sidebar,
    hasSidebar: computed(() => sidebar.value.length > 0)
  }
}
