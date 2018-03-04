
let state = {
  token:null,
  userId:null,
  navHeader:{}
};

function initlizeState() { //关闭网页后再次访问 取出token
  let token = localStorage.getItem('jwt');
  if (token) {
    // 取出jwtpayload部分(jwt由.分割的三部分组成)
    // base64解码后 是json string格式 再通过JSON.parse 转成对象
    const payload = JSON.parse(window.atob(token.split('.')[1]));

    // 前端判断token是否过期，如果过期了访问时候会路由到login页面
    if (payload.exp > Date.now() / 1000) {
      state.token = token;
      state.userId = payload.data.userId;
    }
  }

}

initlizeState();

export default state
