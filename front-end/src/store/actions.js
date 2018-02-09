
import api from "../api"
import router from '../router'/*用于路由跳转*/

export default {
  UserLogout({commit}){
    commit("USER_LOGOUT");
    router.push({path:'/admin/login'});
  },
  UserLogin({commit},token){
    commit('USER_SIGNIN',token)
  },
  changeProgress({commit},value){
    commit("CHANGE_PROGRESS",value);
  }
}
