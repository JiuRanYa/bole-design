import { createRouter, createWebHistory } from 'vue-router'

document.title = 'Message | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/Message/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `Message - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
