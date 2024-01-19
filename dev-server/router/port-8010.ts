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
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  document.title = `modal - ${typeof to.name === 'string' ? to.name : 'dev'} | Panda UI`
})
