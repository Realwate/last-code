
export default {
  USER_LOGOUT(state){
    localStorage.removeItem("jwt");
    state.token = null;
  },
  USER_SIGNIN(state,token){
    //登录成功 存放token到localstorage 同时改变全局数据
    localStorage.setItem('jwt',token);
    state.token = token;
  }
}
