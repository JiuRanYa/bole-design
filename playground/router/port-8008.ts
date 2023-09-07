import { createRouter, createWebHistory } from 'vue-router'

document.title = 'avatar | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/avatar/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `avatar - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
