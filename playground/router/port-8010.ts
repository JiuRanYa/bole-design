import { createRouter, createWebHistory } from 'vue-router'

document.title = 'modal | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/modal/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `modal - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
