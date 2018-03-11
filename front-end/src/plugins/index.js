import Msg from './msg'
import api from '../api'
import util from './util'
import config from '../config'


export default {
  install(Vue) {
    let extend = {
      $api: api,
      $util: util,
      $config: config,
    }
    Object.assign(Vue.prototype, Msg, extend);
  }
}
