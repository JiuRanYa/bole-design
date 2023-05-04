import { createRouter, createWebHistory } from 'vue-router'

document.title = 'button | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'badge',
      component: () => import('../../docs/demos/button/badge/demo.zh-CN.vue')
    },
    {
      path: '/basic',
      name: 'basic',
      component: () => import('../../docs/demos/button/basic/demo.zh-CN.vue')
    },
    {
      path: '/disable',
      name: 'disable',
      component: () => import('../../docs/demos/button/disable/demo.zh-CN.vue')
    },
    {
      path: '/size',
      name: 'size',
      component: () => import('../../docs/demos/button/size/demo.zh-CN.vue')
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
