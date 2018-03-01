// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Vue.config.productionTip = false

import Vue from "vue";
import ElementUI from "element-ui";
import App from './App';

import 'font-awesome/css/font-awesome.min.css'
import "nprogress/nprogress.css";

// import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss';
import "./assets/scss/common.scss";


Vue.use(ElementUI);

import router from './router'
import store from './store'

import util from '@/util'
Vue.use(util)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
