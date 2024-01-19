import { createRouter, createWebHistory } from 'vue-router'

document.title = 'tooltip | Panda UI'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/panda-ui/tooltip/basic/index.vue')
    },
    {
      path: '/placement',
      name: 'placement',
      component: () => import('../../docs/demos/panda-ui/tooltip/placement/index.vue')
    },
    {
      path: '/reverse',
      name: 'reverse',
      component: () => import('../../docs/demos/panda-ui/tooltip/reverse/index.vue')
    },
    {
      path: '/trigger',
      name: 'trigger',
      component: () => import('../../docs/demos/panda-ui/tooltip/trigger/index.vue')
    },
    {
      path: '/visible',
      name: 'visible',
      component: () => import('../../docs/demos/panda-ui/tooltip/visible/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `tooltip - ${typeof to.name === 'string' ? to.name : 'dev'} | Panda UI`
})
