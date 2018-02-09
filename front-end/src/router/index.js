import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    component: Login
  }
];

let router = new Router({
  routes,
  mode:'history',
})

export default router
