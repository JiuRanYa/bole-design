export const defaultNav = [
  {
    link: '/guide/design',
    text: '指南'
  },
  {
    link: '/components',
    text: '组件'
  }
]

function getNav() {
  const lang = 'zh-CN'
  const dNav = [...defaultNav]

  dNav.forEach(item => {
    item.link = `/${lang}${item.link}`
  })

  return dNav
}

export const nav = getNav()
