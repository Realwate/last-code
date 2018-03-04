
import router from '@/router'/*用于路由跳转*/

import api from '@/api'

let version = 1;
export default {
  UserLogout({ commit }) {
    commit("USER_LOGOUT");
    router.push({ name: 'login' });
  },
  UserLogin({ commit }, token) {
    commit('USER_SIGNIN', token)
  },
  async ChangeNavHeader({ commit,state }, data) {
    let localV = version;
    // 一样不更新
    if(data == null && state.tags){
      return;
    }
    if(data == null){
      let tags = await api.getTagByUser(state.userId);
      if(localV === version){
        version++;
        commit('NAV_HEADER_CHANGE', {tags});
      }
      return;
    }
    version++;
    commit('NAV_HEADER_CHANGE', data);
  }
}
