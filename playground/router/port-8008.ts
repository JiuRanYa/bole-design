import { createRouter, createWebHistory } from 'vue-router'

document.title = 'input | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/input/basic/index.vue')
    },
    {
      path: '/suffix',
      name: 'suffix',
      component: () => import('../../docs/demos/bole-design/input/suffix/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `input - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
