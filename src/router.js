import Router from 'vue-router'
import Vue from 'vue'
const Explorer = () => import('@/views/Explorer.vue')
const Join = () => import('@/views/auth/Join.vue')
const Login = () => import('@/views/auth/Login.vue')

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
  ],
})

export function redirectUsersAwayFromAuthForms(to, from, next) {
  next()
}

router.beforeEach(redirectUsersAwayFromAuthForms)

export default router
