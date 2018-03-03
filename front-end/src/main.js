Vue.config.productionTip = false

import Vue from "vue";
import App from './App';

import 'element-ui/lib/theme-chalk/display.css';
import 'font-awesome/css/font-awesome.min.css'
import "nprogress/nprogress.css";

// import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss';
import "./assets/scss/common.scss";

import element from 'element-ui'
Vue.use(element);

import plugins from '@/plugins'
Vue.use(plugins);

import router from './router'
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
