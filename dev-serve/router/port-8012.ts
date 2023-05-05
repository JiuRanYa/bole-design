import { createRouter, createWebHistory } from 'vue-router'

document.title = 'menu | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/menu/basic/demo.zh-CN.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `menu - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
