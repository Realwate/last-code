import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import NotFound from '@/components/NotFound'

import MainRoot from '@/components/main/MainRoot'
import Timeline from '@/components/main/timeline/Timeline'

import QuestionDetail from '@/components/main/question/QuestionDetail'
import QuestionAsk from '@/components/main/question/QuestionAsk'

import TagDetail from '@/components/main/tag/TagDetail'
import TagManagement from '@/components/main/tag/TagManagement'

import UserProfile from '@/components/main/profile/UserProfile'
import UserSetting from '@/components/main/profile/UserSetting'

// const UserProfile = () => import(/* webpackChunkName: "profile" */ '@/components/main/profile/UserProfile')

import store from "@/store"
import {basePath} from "@/config/env"

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: MainRoot,
    children: [
      {path: '', redirect: 'timeline'},
      {path: 'timeline', component: Timeline, name: 'timeline'},
      {path: 'question/:questionId', component: QuestionDetail, name: 'questionDetail'},
      {path: 'ask', component: QuestionAsk, name: 'questionAsk'},

      {path: 'tag', component: TagManagement, name: 'tagManagement'},
      {path: 'tag/:tagId', component: TagDetail, name: 'tagDetail'},

      {path: 'profile/:userId/activities', component: UserProfile, name: 'userProfile'},
      {path: 'profile/edit', component: UserSetting, name: 'userSetting'},
    ],
    meta: {requiresAuth: true}
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'signup',
    path: '/signup',
    component: SignUp
  },
  {
    path: '*',
    component: NotFound,
  }
];

let router = new Router({
  base: basePath,
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
      /* 默认记录了滚动的状态 */
    } else {
      return {x: 0, y: 0}
    }
  }
})
router.beforeEach((to, from, next) => {
  let needLogin = to.matched.some(record => record.meta.requiresAuth);
  if (needLogin && !store.state.token) {
    next({
      name: "login",
      query: {redirect: true}
    })
    return;
  }
  next();
})

export default router
