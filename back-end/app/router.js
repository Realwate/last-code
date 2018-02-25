'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.post('/api/login', app.controller.user.login);
  // router.post('/api/signup', app.controller.user.create);

  // 自动映射 restful API
  // http://eggjs.org/zh-cn/basics/router.html#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89
  router.resources('user', '/api/user', app.controller.user);
  router.get('/api/user/:userId/following-questions',  app.controller.user.getFollowingQuestions);
  router.get('/api/user/:userId/following-users',  app.controller.user.getFollowingUsers);
  router.get('/api/user/:userId/following-tags',  app.controller.user.getFollowingTags);


  // 问题
  router.post('/api/question', app.controller.question.create);
  router.get('/api/user/:userId/question',  app.controller.question.getQuestionByUser);

  // 回答
  router.post('/api/answer',  app.controller.answer.create);
  router.get('/api/user/:userId/answer',app.controller.answer.getAnswerByUser);

  // 关注
  router.post('/api/user/:userId/follower',app.controller.user.addFollower);
  router.delete('/api/user/:userId/follower',app.controller.user.deleteFollower);

  router.post('/api/tag/:tagId/follower',app.controller.tag.addFollower);
  router.delete('/api/tag/:tagId/follower',app.controller.tag.deleteFollower);

  router.post('/api/question/:questionId/follower',app.controller.question.addFollower);
  router.delete('/api/question/:questionId/follower',app.controller.question.deleteFollower);

  // 系统信息
  router.get('system', '/api/system', app.controller.system.getSystemInfo);

};
