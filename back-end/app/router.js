'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.post('/api/login', app.controller.user.login);
  router.post('/api/signup', app.controller.user.create);

  // 自动映射 restful API
  // http://eggjs.org/zh-cn/basics/router.html#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89
  router.resources('topics', '/api/topics', app.controller.topics);

};
