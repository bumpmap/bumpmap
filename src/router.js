import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/home/Map.vue'
import Join from '@/components/auth/Join.vue'
import Login from '@/components/auth/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map,
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
