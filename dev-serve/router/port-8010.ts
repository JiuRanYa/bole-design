import { createRouter, createWebHistory } from 'vue-router'

document.title = 'button | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/button/basic/demo.zh-CN.vue')
    },
    {
      path: '/primary',
      name: 'primary',
      component: () => import('../../docs/demos/button/primary/demo.zh-CN.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `button - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
