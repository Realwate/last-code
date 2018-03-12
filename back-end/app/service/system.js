'use strict';

const Service = require('../core/base_service');
class SystemService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  async getSystemInfo() {
    let [userCount, questionCount, answerCount] = await this.parallel(
      this.getService('user').count(),
      this.getService('question').count(),
      this.getService('answer').count());

    return {
      userCount, questionCount, answerCount
    }
  }
  async getSimilarUsers(userId) {
    let userIds = await this.app.recommender.getSimilarUsersFromCache(userId, { count: 4 });
    if (userIds == null) {
      return null;
    }
    let users = await this.getDao('User').findAll({
      where: { id: { [this.Op.in]: userIds } },
    });
    return this.jsonModel(users)
  }

  async saveBehaviorData(userId, itemId, score) {
    let recommender = this.app.recommender;
    // 保存用户行为数据
    let res = await recommender.loadDataSet({ [userId]: { [itemId]: score } });
    // 添加到队列 定时刷新
    this.app.Queue.get('refreshUsers').add(userId);
  }

}
module.exports = SystemService;
