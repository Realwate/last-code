import Msg from './msg'
import api from '../api'
import util from './util'


export default {
  install(Vue){
    let extend = {
      $api:api,
      $util:util
    }
    Object.assign(Vue.prototype,Msg,extend);
  }
}
