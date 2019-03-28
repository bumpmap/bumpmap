import Router from 'vue-router'
import Vue from 'vue'
const Explorer = () => import('@/views/Explorer.vue')
const Join = () => import('@/views/auth/Join.vue')
const Login = () => import('@/views/auth/Login.vue')
const PinDetail = () => import('@/views/PinDetail.vue')
import { store } from '@/state'
import { contains } from 'rambda'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Explorer',
      component: Explorer,
    },
    {
      path: '/join',
      name: 'Join',
      component: Join,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/pin/:pinId',
      name: 'PinDetail',
      component: PinDetail,
    },
  ],
})

export function redirectUsersAwayFromAuthForms(to, from, next) {
  const disallowedIfLoggedIn = ['Login', 'Join']

  if (contains(to.name)(disallowedIfLoggedIn)) {
    const { user } = store.getState()
    if (user && user.exists) {
      next({ name: 'Explorer' })
    } else {
      next()
    }
  } else {
    next()
  }
}

router.beforeEach(redirectUsersAwayFromAuthForms)

export default router
