function getProjectLink(pro: string, link: string) {
  return `/projects/${pro}${link}`
}

export const navs: Record<string, any> = {
  'panda-ui': [
    {
      link: getProjectLink('panda-ui', '/guide/design'),
      text: '指南'
    },
    {
      link: getProjectLink('panda-ui', '/components/button'),
      text: '组件'
    },
    {
      link: getProjectLink('panda-ui', '/hooks/usePopper'),
      text: 'Hooks'
    },
    {
      link: getProjectLink('panda-ui', '/cdn/icon'),
      text: '图标'
    },
    {
      link: getProjectLink('panda-ui', '/contribute/start'),
      text: '贡献'
    }
  ],
  panda: [
    {
      link: getProjectLink('panda', '/guide/index'),
      text: '项目说明'
    },
    {
      link: getProjectLink('panda', '/standard/index'),
      text: '代码规范'
    }
  ],
  chat: [
    {
      link: getProjectLink('chat', '/guide/index'),
      text: '使用指南'
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
