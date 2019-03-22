import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/home/Map.vue'
import Join from '@/components/auth/Join.vue'
import Login from '@/components/auth/Login.vue'
import Explorer from '@/views/Explorer.vue'

Vue.use(Router)

export default new Router({
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
