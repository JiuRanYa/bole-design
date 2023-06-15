import { createRouter, createWebHistory } from 'vue-router'

document.title = 'date-picker | Bole Design'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/bole-design/date-picker/basic/index.vue')
    },
    {
      path: '/preset',
      name: 'preset',
      component: () => import('../../docs/demos/bole-design/date-picker/preset/index.vue')
    },
    {
      path: '/range',
      name: 'range',
      component: () => import('../../docs/demos/bole-design/date-picker/range/index.vue')
    },
    {
      path: '/trigger',
      name: 'trigger',
      component: () => import('../../docs/demos/bole-design/date-picker/trigger/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `date-picker - ${typeof to.name === 'string' ? to.name : 'dev'} | Bole Design`
})
