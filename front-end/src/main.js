// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Vue.config.productionTip = false

import Vue from "vue";
import ElementUI from "element-ui";
import App from './App';
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss';

Vue.use(ElementUI);

import router from './router'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
