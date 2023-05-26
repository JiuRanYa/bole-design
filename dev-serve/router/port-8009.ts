import { createRouter, createWebHistory } from 'vue-router'

document.title = 'tooltip | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/tooltip/basic/index.vue')
    },
    {
      path: '/placement',
      name: 'placement',
      component: () => import('../../docs/demos/bole-design/tooltip/placement/index.vue')
    },
    {
      path: '/visible',
      name: 'visible',
      component: () => import('../../docs/demos/bole-design/tooltip/visible/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `tooltip - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
