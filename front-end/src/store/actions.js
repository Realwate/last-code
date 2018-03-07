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
  async ChangeNavHeader({commit, state}, data) {
    let {version, valid} = getVersion('navHeader');
    // 一样不更新
    if (data == null && state.navHeader.tags) {
      commit('NAV_HEADER_CHANGE', {type: null});
      return;
    }
    if (data == null) {
      let tags = await api.getTagByUser(state.userId);
      valid(version) && commit('NAV_HEADER_CHANGE', {type: null, tags});
      return;
    }
    valid(version) && commit('NAV_HEADER_CHANGE', data);
  }
}
