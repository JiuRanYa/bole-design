import { createRouter, createWebHistory } from 'vue-router'

document.title = 'checkbox | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/checkbox/basic/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `checkbox - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
