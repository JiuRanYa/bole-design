import { createRouter, createWebHistory } from 'vue-router'

document.title = 'message | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/message/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `message - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
