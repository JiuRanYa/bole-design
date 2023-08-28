import { createRouter, createWebHistory } from 'vue-router'

document.title = 'tabs | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/tabs/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `tabs - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
