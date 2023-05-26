import { createRouter, createWebHistory } from 'vue-router'
import  store  from '@/store'
import { user } from '@/service' 
import { message } from 'ant-design-vue'

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
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../views/Profile/index.vue')
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('../views/Dashboard/index.vue')
        }
      ]
    },
    
  ]
})

// 前置路由守卫
router.beforeEach( async (to,from,next) => {

  let res = {}

  try {
    res = await user.info()
  } catch (error) {
    if ( error.message.includes('401')) {
      res.code = 401
    }
  }


  if ( res.code === 401 ) {
    if ( to.path === '/auth' ) {
      next()
      return
    }

    message.error('认证失败，重新登录')
    next('/auth')
    return
  }

 
  
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
