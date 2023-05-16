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
    location.pathname = `/projects/${projectsAlias[userPreferredPro]}/index.html`
  }
})()
