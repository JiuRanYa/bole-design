function getProjectLink(pro: string, link: string) {
  return `/projects/${pro}${link}`
}

export const navs: Record<string, any> = {
  'bole-design': [
    {
      link: getProjectLink('bole-design', '/guide/design'),
      text: '指南'
    },
    {
      link: getProjectLink('bole-design', '/components/button'),
      text: '组件'
    },
    {
      link: getProjectLink('bole-design', '/hooks/guide'),
      text: 'Hooks'
    }
  ],
  panda: [
    {
      link: '/guide/design',
      text: '项目说明'
    },
    {
      link: '/components',
      text: '代码规范'
    }
  ]
}
function getNav() {
  // const project = getProject()
  //
  // if (navs[project.value]) {
  //   console.warn(`${project.value} nav config not exit, pls add config to nav.ts`)
  // }
  // return navs[project.value]
}

export const nav = getNav()
