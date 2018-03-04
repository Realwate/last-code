import axios from 'axios';
import store from '../store'
import NProgress from 'nprogress'
import {baseUrl} from '../config/env'

//全局axios默认设置
axios.defaults.headers.post['Content-Type'] = 'application/json';


const authAxios = axios.create();
authAxios.defaults.headers.post['Content-Type'] = 'application/json';

let token = store.state.token;
if (token) {
  //发送需要认证的请求 带上token 后台会校验后再返会
  authAxios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

//拦截请求响应，控制顶部进度条
axios.interceptors.request.use = authAxios.interceptors.request.use;
authAxios.interceptors.request.use(config => {
  NProgress.start();
  return config
}, err => {
  NProgress.done();
  return Promise.reject(err)
})
// axios拦截响应
authAxios.interceptors.response.use(response => {
  NProgress.done();
  return response
}, err => {
  NProgress.done();
  return Promise.reject(err)
});

axios.defaults.baseURL = authAxios.defaults.baseURL = baseUrl

//添加修改删除 都需要带上token
function postApi(apiPath, params, method = "post") {
  return resolveResult(authAxios[method](apiPath, params));
}

function getApi(apiPath, params) {
  return resolveResult(axios.get(apiPath, params));
}

function resolveResult(res) {
  return res.then(({data}) => data)
}

export default {
  login(data) {
    return postApi('/api/login', data)
  },
  signup(data) {
    return postApi('/api/signup', data)
  },
  getTagByUser(userId){
    return new Promise((resolve)=>{
      let data = [{id:'a',name:'java'},{id:'ad',name:'android'},]
      setTimeout(()=>resolve(data),1000);
    })
  }
}
