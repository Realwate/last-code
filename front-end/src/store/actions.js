import router from '@/router'
/*用于路由跳转*/

import api from '@/api'

let getVersion = (function () {
  let versionMap = {};
  return (name) => {
    return {
      version: versionMap[name] || (versionMap[name] = 1),
      valid: (v) => v === versionMap[name] && versionMap[name]++
    }
  }
})()

export default {
  UserLogout({commit}) {
    commit("USER_LOGOUT");
    router.push({name: 'login'});
  },
  UserLogin({commit}, token) {
    commit('USER_SIGNIN', token)
  },
  async ChangeNavHeader({commit, state,getters }, data) {
    let {version, valid} = getVersion('navHeader');
    if (data == null) {
      let tags = await api.getTagByUser(getters.loggedInUserId);
      valid(version) && commit('NAV_HEADER_CHANGE', {type: null, tags});
      return;
    }
    valid(version) && commit('NAV_HEADER_CHANGE', data);
  },
  async GetLoggedInUser({commit, state,getters }, data) {
    let loggedInUser = await api.getUserProfile(getters.loggedInUserId);
    commit('USER_CHANGE', loggedInUser);
  }
}
