
import axios from 'axios';
import store from '../store'

//全局axios默认设置
axios.defaults.headers.post['Content-Type'] = 'application/json';


const authAxios = axios.create();
authAxios.defaults.headers.post['Content-Type'] = 'application/json';

if(localStorage.getItem('jwt')){
  //发送需要认证的请求 带上token 后台会校验后再返会
  authAxios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('jwt');
}

//拦截请求响应，控制顶部进度条
axios.interceptors.request.use = authAxios.interceptors.request.use;
authAxios.interceptors.request.use(config=>{
  store.dispatch('changeProgress',20)
  return config
},err=>{
  // store.dispatch('showProgress',100)
  return Promise.reject(err)
})
// axios拦截响应
authAxios.interceptors.response.use(response=>{
  store.dispatch('changeProgress',100)
  return response
},err=>{
  store.dispatch('showProgress',100)
  return Promise.reject(err)
});

//前后端分离，调用后端服务
axios.defaults.baseURL = authAxios.defaults.baseURL = '/localhost:7001';

//添加修改删除 都需要带上token
function postApi(apiPath,params,method="post"){
  return resolveResult(authAxios[method](apiPath,params));
}
function getApi(apiPath,params){
  return resolveResult(axios.get(apiPath,params));
}
function resolveResult(res){
  return res.then(({data})=>data)
}

export default{
  localLogin(data){
     return postApi('/api/login',data)
  }
}
