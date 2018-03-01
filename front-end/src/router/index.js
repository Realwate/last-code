import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import NotFound from '@/components/NotFound'

import Root from '@/components/main/Root'
import Timeline from '@/components/main/timeline/Timeline'

import UserProfile from '@/components/main/profile/UserProfile'

import store from "@/store"

Vue.use(Router)

let rootPath = location.pathname;

let routes = [
  {
    path: '/',
    component: Root,
    children: [
      { path: '',  redirect: 'timeline' },
      { path: 'timeline', component: Timeline, name: 'timeline' },
      { path: 'profile', component: UserProfile,name:'userProfile' },
    ],
    meta: { requiresAuth: true }
  },
  {
    name:'login',
    path: '/login',
    component: Login
  },
  {
    name:'signup',
    path: '/signup',
    component: SignUp
  },
  {
    path: '*',
    component: NotFound,
  }
];

let router = new Router({
  routes,
  mode: 'history',
})
router.beforeEach((to, from, next) => {
  let needLogin = to.matched.some(record => record.meta.requiresAuth);
  if (needLogin && !store.state.token) {
    next({
      path: "/login",
      query: { redirect: true }
    })
    return;
  }
  next();
})

export default router
