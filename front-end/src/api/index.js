import axios from 'axios';
import store from '../store'
import NProgress from 'nprogress'
import {baseUrl} from '../config/env'
import Msg from '../plugins/msg'
import router from '../router'

//全局axios默认设置
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const authAxios = axios.create();
authAxios.defaults.headers.post['Content-Type'] = 'application/json';

//拦截请求响应，控制顶部进度条
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

authAxios.defaults.baseURL = baseUrl

//添加修改删除 都需要带上token
function postApi(apiPath, params, method = "post") {
  return resolveResult(authAxios[method](apiPath, params));
}

function getApi(apiPath, params) {
  return resolveResult(authAxios.get(apiPath, params));
}

function resolveResult(res) {
  return res.then(({data}) => data)
    .then(({success, error, data}) => {
      if (!success) { // 统一错误处理
        Msg.alertError(error.message)
        if (error.code === 403) {
          router.push({name: 'login'})
          return
        }
        console.error(error);
        throw new Error(error.message);
      }
      return data
    })
}

function setAxiosToken(token) {
  if (!token) {
    authAxios.defaults.headers.common['Authorization'] = undefined;
    return;
  }
  //发送需要认证的请求 带上token 后台会校验
  authAxios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

setAxiosToken(store.state.token);

export {
  setAxiosToken
}

function addQueryString(params = {}) {
  let str = Object.entries(params)
    .map((entry) => entry.join('='))
    .join('&')
  if (str) {
    return '?' + str;
  }
  return '';
}

export default {
  parallel(...multiPromise) {
    return Promise.all(multiPromise);
  },
  login(data) {
    return postApi('/api/login', data)
  },
  signup(data) {
    return postApi('/api/signup', data)
  },
  timeline(type, params) { // recommend recent hot
    return getApi(`/api/timeline/${type}${addQueryString(params)}`);
  },
  getSystemInfo() {
    return getApi(`/api/system`);
  },
  getQuestion(questionId) {
    return getApi(`/api/question/${questionId}`);
  },
  getSimilarUsers() {
    return getApi(`/api/system/similarusers`);
  },
  getTagByUser(userId, params) {
    return getApi(`/api/user/${userId}/following-tags${addQueryString(params)}`);
  },
  getAllTag(params) {
    return getApi(`/api/tag${addQueryString(params)}`);
  },
  tagAddFollower(tagId) {
    return postApi(`/api/tag/${tagId}/follower`);
  },
  tagRemoveFollower(tagId) {
    return postApi(`/api/tag/${tagId}/follower`, null, 'delete');
  },
  getTagDetail(tagId) {
    return getApi(`/api/tag/${tagId}`);
  },
  saveQuestion(params) {
    return postApi(`/api/question`, params);
  },
  getUserProfile(userId) {
    return getApi(`/api/user/${userId}`);
  },
  updateUserProfile(userId, user) {
    return postApi(`/api/user/${userId}`, user, 'patch');
  },
  getUserQuestion(userId,params) {
    return getApi(`/api/user/${userId}/question${addQueryString(params)}`);
  },
  getUserAnswer(userId,params) {
    return getApi(`/api/user/${userId}/answer${addQueryString(params)}`);
  },
  getUserFollow(userId) {
    return getApi(`/api/user/${userId}/following`);
  },
  getFollowingUsers(userId,params) {
    return getApi(`/api/user/${userId}/following-users${addQueryString(params)}`);
  },
  getFollowingQuestions(userId,params) {
    return getApi(`/api/user/${userId}/following-questions${addQueryString(params)}`);
  },
  addUserFollower(userId) {
    return postApi(`/api/user/${userId}/follower`);
  },
  removeUserFollower(userId) {
    return postApi(`/api/user/${userId}/follower`, null, 'delete');
  },
  addQuestionFollower(questionId) {
    return postApi(`/api/question/${questionId}/follower`);
  },
  removeQuestionFollower(questionId) {
    return postApi(`/api/question/${questionId}/follower`, null, 'delete');
  },
  addAnswer(params) {
    return postApi(`/api/answer`, params);
  },
  searchQuestion(keywords,params) {
    params = Object.assign({keywords},params)
    return getApi(`/api/question/query${addQueryString(params)}`);
  },
  searchTag(keywords, params) {
    params = Object.assign({keywords}, params)
    return getApi(`/api/tag/query${addQueryString(params)}`);
  },
  addViews(questionId) {
    return postApi(`/api/question/${questionId}/views`);
  },
}
