'use strict';

const Service = require('../core/base_service');

// actor action target
const ACTIONS = {
  USER_CREATE_ANSWER: 'USER_CREATE_ANSWER',
  USER_CREATE_QUESTION: 'USER_CREATE_QUESTION',
}

class NotificationService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'Notification'
  }
  key(userId) {
    return `notification:${userId}`;
  }
  // 获得通知数量
  async getCount(userId) {
    let count = await this.app.Counter.get(this.key(userId));
    return Number(count);
  }
  // 点击清零
  async resetCount(userId) {
    return this.app.Counter.reset(this.key(userId));
  }
  // 标记为已查看
  async updateViewed(id) {
    let notification = await this.findById(id);
    notification.viewed = true;
    return notification.save();
  }
  async addQuestionCreateMsg() {
  }
  async addAnswerCreateMsg(question, answerCreator, answerId) {
    // 创建答案 提醒的是问题 answerId暂不用
    let questionFollowers = await question.getFollower();
    let userFollowers = await answerCreator.getFollower();
    // set 去重
    let hasAddedSet = new Set()
    let addNotification = (userId) => {
      this.create({ userId, actor: answerCreator.id, target: question.id, action: ACTIONS.USER_CREATE_ANSWER });
      // 添加计数
      this.app.Counter.incrby(this.key(userId), hasAddedSet.size);
    }
    // 用户关注 推送
    for (let follower of userFollowers) {
      let followerId = follower.id
      hasAddedSet.add(followerId);
      addNotification(followerId)
    }
    // 问题关注 推送
    for (let follower of questionFollowers) {
      let followerId = follower.id
      if (hasAddedSet.has(followerId) || followerId == answerCreator.id) {
        continue;
      }
      hasAddedSet.add(followerId);
      addNotification(followerId);
    }
  }
  async getNotificationByUser(userId, page) {
    // 重置数量
    await this.resetCount(userId);
    let notifications = await this.dao.findAll({
      order: [['created_at', 'DESC']],
      where: {
        userId
      },
      ...page
    })
    let result = [];
    for (let notification of this.jsonModel(notifications)) {
      result.push(await this.resolveNotification(notification));
    }
    return result;
  }
  // 返回通知详细
  async resolveNotification(notification) {
    let action = notification.action;
    let target, actor, tpl;
    switch (action) {
      // 回答了问题
      case ACTIONS.USER_CREATE_ANSWER:
        actor = await this.getService('user').findById(notification.actor);
        target = await this.getService('question').findById(notification.target);
        tpl = '{}回答了问题{}'
        break;
      // 提出了问题
      case ACTIONS.USER_CREATE_QUESTION:
        actor = await this.getService('user').findById(notification.actor);
        target = await this.getService('question').findById(notification.target);
        tpl = '{}提出了问题{}'
        break;
    }
    return {
      ...notification,
      tpl, // 使用模板 前台不用太多复杂判断逻辑
      actor,
      target,
    }
  }

}

module.exports = NotificationService;
