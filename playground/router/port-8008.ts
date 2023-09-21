import { createRouter, createWebHistory } from 'vue-router'

document.title = 'dropdown | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/dropdown/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `dropdown - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
