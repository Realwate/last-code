
let state = {
  token:null,
  navHeader:{}
};

function initlizeState() { //关闭网页后再次访问 取出token
  state.token = localStorage.getItem('jwt');
}

initlizeState();

export default state
