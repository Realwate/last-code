'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/login', app.controller.user.login);
  router.post('/api/signup', app.controller.user.create);

  // 自动映射 restful API
  // http://eggjs.org/zh-cn/basics/router.html#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89
  router.resources('user', '/api/user', app.controller.user);
  router.get('/api/user/:userId/following-questions',  app.controller.user.getFollowingQuestions);
  router.get('/api/user/:userId/following-users',  app.controller.user.getFollowingUsers);
  router.get('/api/user/:userId/following',  app.controller.user.getAllFollowing);


  // 问题
  router.post('/api/question', app.controller.question.create);
  router.get('/api/question/query', app.controller.question.queryQuestionByKeywords);
  router.get('/api/question/:questionId', app.controller.question.show);
  router.post('/api/question/:questionId/views', app.controller.question.addViews);
  router.post('/api/question/:questionId/vote', app.controller.question.addVote);
  router.delete('/api/question/:questionId/vote', app.controller.question.deleteVote);
  router.get('/api/user/:userId/question',  app.controller.question.getQuestionByUser);

  // 回答
  router.post('/api/answer',  app.controller.answer.create);
  router.get('/api/user/:userId/answer',app.controller.answer.getAnswerByUser);
  router.post('/api/answer/:answerId/vote', app.controller.answer.addVote);
  router.delete('/api/answer/:answerId/vote', app.controller.answer.deleteVote);

  // 关注
  router.post('/api/user/:userId/follower',app.controller.user.addFollower);
  router.delete('/api/user/:userId/follower',app.controller.user.deleteFollower);

  router.post('/api/tag/:tagId/follower',app.controller.tag.addFollower);
  router.delete('/api/tag/:tagId/follower',app.controller.tag.deleteFollower);

  router.post('/api/question/:questionId/follower',app.controller.question.addFollower);
  router.delete('/api/question/:questionId/follower',app.controller.question.deleteFollower);

  // tag
  router.get('/api/tag', app.controller.tag.getAllTag);
  router.get('/api/tag/query', app.controller.tag.queryTagByKeywords);
  router.get('/api/tag/:tagId', app.controller.tag.getTagDetail);
  // 带有count信息的通过tag找
  router.get('/api/user/:userId/following-tags',  app.controller.tag.getUserTag);

  // 系统信息
  router.get('/api/system', app.controller.system.getSystemInfo);
  router.get('/api/system/similarusers', app.controller.system.getSimilarUsers);

  router.post('/api/upload/avatar', app.controller.system.uploadAvatar);
  router.get('/image/avatar/:name', app.controller.system.getAvatar);

  // timeline
  router.get('/api/timeline/recommend', app.controller.timeline.getRecommendedItem);
  router.get('/api/timeline/recent', app.controller.timeline.getRecentItem);
  router.get('/api/timeline/hot', app.controller.timeline.getHottestItem);

  // notification
  router.get('/api/notification', app.controller.notification.getNotifications);
  router.patch('/api/notification/:notificationId', app.controller.notification.updateViewed);
};
