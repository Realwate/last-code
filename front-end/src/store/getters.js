
export default {
  loggedInUserId: (state, getters) => {
    if(getters.payload == null){
      return null;
    }
    return getters.payload.data.userId;
  },
  payload: (state) => {
    // 取出jwtpayload部分(jwt由.分割的三部分组成)
    // base64解码后 是json string格式 再通过JSON.parse 转成对象
    if(state.token == null){
      return null;
    }
    return JSON.parse(window.atob(state.token.split('.')[1]));
  },
}
