import { createRouter, createWebHistory } from 'vue-router'

document.title = 'select | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/select/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `select - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
