import Msg from './msg'
import api from '../api'
import util from './util'
import config from '../config'

import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' //样式文件

export default {
  install(Vue) {
    Vue.directive('highlight',function (el) {
      el.classList.contains('markdown-body') || el.classList.add('markdown-body');
      let blocks = el.querySelectorAll('pre code');
      blocks.forEach((block)=>{
        hljs.highlightBlock(block)
      })

    })
    let extend = {
      $api: api,
      $util: util,
      $config: config,
    }
    Object.assign(Vue.prototype, Msg, extend);
  }
}
