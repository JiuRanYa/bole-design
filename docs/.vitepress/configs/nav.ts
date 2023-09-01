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
      link: getProjectLink('bole-design', '/hooks/usePopper'),
      text: 'Hooks'
    },
    {
      link: getProjectLink('bole-design', '/cdn/icon'),
      text: '图标'
    },
    {
      link: getProjectLink('bole-design', '/contribute/start'),
      text: '贡献'
    }
  ],
  panda: [
    {
      link: getProjectLink('panda', '/guide/index'),
      text: '项目说明'
    },
    {
      link: getProjectLink('panda', '/design/index'),
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
