import { createRouter, createWebHistory } from 'vue-router'

document.title = 'modal | Panda UI'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/panda-ui/modal/basic/index.vue')
    },
    {
      path: '/custom',
      name: 'custom',
      component: () => import('../../docs/demos/panda-ui/modal/custom/index.vue')
    },
    {
      path: '/reverse',
      name: 'reverse',
      component: () => import('../../docs/demos/panda-ui/modal/reverse/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `modal - ${typeof to.name === 'string' ? to.name : 'dev'} | Panda UI`
})
