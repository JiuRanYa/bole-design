import { createRouter, createWebHistory } from 'vue-router'

document.title = 'filter | Panda UI'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/panda-ui/filter/basic/index.vue')
    },
    {
      path: '/custom',
      name: 'custom',
      component: () => import('../../docs/demos/panda-ui/filter/custom/index.vue')
    },
    {
      path: '/default',
      name: 'default',
      component: () => import('../../docs/demos/panda-ui/filter/default/index.vue')
    },
    {
      path: '/nested',
      name: 'nested',
      component: () => import('../../docs/demos/panda-ui/filter/nested/index.vue')
    },
    {
      path: '/props',
      name: 'props',
      component: () => import('../../docs/demos/panda-ui/filter/props/index.vue')
    },
    {
      path: '/readonly',
      name: 'readonly',
      component: () => import('../../docs/demos/panda-ui/filter/readonly/index.vue')
    },
    {
      path: '/validation',
      name: 'validation',
      component: () => import('../../docs/demos/panda-ui/filter/validation/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `filter - ${typeof to.name === 'string' ? to.name : 'dev'} | Panda UI`
})
