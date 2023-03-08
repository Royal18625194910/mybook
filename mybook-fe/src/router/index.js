import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/Auth/index.vue')
    },
    {
      path: '/',
      name: 'BasicLayout',
      component: () => import('../layout/BasicLayout/index.vue'),
      children: [
        {
          path: 'books',
          name: 'Books',
          component: () => import('../views/Books/index.vue')
        },
      ]
    }
  ]
})

export default router
