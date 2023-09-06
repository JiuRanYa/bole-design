;(() => {
  const defaultPro = 'bl'
  const localStorageProName = 'bl-userPreferredPro'

  const projectsAlias = {
    bl: 'bole-design',
    panda: 'panda'
  }
  const userPreferredPro = localStorage.getItem(localStorage) ?? defaultPro

  !localStorage.getItem(localStorageProName) &&
    localStorage.setItem(localStorageProName, defaultPro)

  if (!location.pathname.startsWith(`/projects/${projectsAlias[userPreferredPro]}`)) {
    const toPath = [`/${userPreferredPro}`].concat(location.pathname.split('/').slice(2)).join('/')
    // location.pathname =
    //   toPath.endsWith('.html') || toPath.endsWith('/') ? toPath : toPath.concat('/')
    location.pathname = '/projects/bole-design/'
  }
})()
