import { getProject } from './project'

export const siderbarsConfig: Record<string, any> = {
  'bole-design': {
    guide: [
      {
        text: 'Guide',
        children: [{ text: 'Design', link: '/guide' }]
      }
    ]
  },
  panda: []
}

export const getSidebars = () => {
  const project = getProject()

  return siderbarsConfig[project]
}

const siderbars = getSidebars()

export default siderbars
