
import api from "../api"
import router from '../router'/*用于路由跳转*/

export default {
  UserLogout({ commit }) {
    commit("USER_LOGOUT");
    router.push({ name: 'login' });
  },
  UserLogin({ commit }, token) {
    commit('USER_SIGNIN', token)
  }
}
