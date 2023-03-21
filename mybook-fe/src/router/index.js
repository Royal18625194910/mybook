import { createRouter, createWebHistory } from 'vue-router'
import  store  from '@/store'

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
        {
          path: 'books/:id',
          name: 'BookDetail',
          component: () => import('../views/BookDetail/index.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../views/Users/index.vue')
        },
        {
          path: 'log',
          name: 'log',
          component: () => import('../views/Log/index.vue')
        },
        {
          path: 'reset/password',
          name: 'resetPassword',
          component: () => import('../views/ResetPassword/index.vue')
        },
        {
          path: 'invite',
          name: 'invite',
          component: () => import('../views/InviteCode/index.vue')
        },
        {
          path: 'book-classify',
          name: 'BookClassify',
          component: () => import('../views/BookClassify/index.vue')
        }
      ]
    },
    
  ]
})

// 前置路由守卫
router.beforeEach( async (to,from,next) => {
  
  const reqArr = []

  if ( !store.state.characterInfo.length ) {
    await store.dispatch('getCharacterInfo')
  }

  if ( !store.state.userInfo.account ) {
    reqArr.push(store.dispatch('getUserInfo'))
  }

  if ( !store.state.bookClassify.length ) {
    reqArr.push(store.dispatch('getBookClassify'))
  }

  await Promise.all(reqArr)

  next()
})

export default router
