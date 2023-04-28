import { createRouter, createWebHistory } from 'vue-router'

document.title = 'row | Bole Design'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('../../docs/demos/row/basic/demo.zh-CN.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

router.afterEach((to) => {
  document.title = `row - ${
    typeof to.name === 'string' ? to.name : 'dev'
  } | Bole Design`
})
