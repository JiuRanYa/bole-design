import { createRouter, createWebHistory } from 'vue-router'

document.title = 'switch | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/switch/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `switch - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
