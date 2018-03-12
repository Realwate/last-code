import {setAxiosToken} from '../api'
export default {
  USER_LOGOUT(state){
    localStorage.removeItem("jwt");
    state.token = null;
    setAxiosToken(null)
  },
  USER_SIGNIN(state,token){
    //登录成功 存放token到localstorage 同时改变全局数据
    localStorage.setItem('jwt',token);
    state.token = token;
    setAxiosToken(token);
  },
  USER_CHANGE(state,loggedInUser){
    state.loggedInUser = loggedInUser;
  },
  NAV_HEADER_CHANGE(state,data){
    state.navHeader = Object.assign({},state.navHeader,data)
  }
}
