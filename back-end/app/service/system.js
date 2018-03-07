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
    let userIds = await this.app.recommender.getSimilarUsersFromCache(userId,{count:3});
    if(userIds == null){
      return null;
    }
    let users = await this.getDao('User').findAll({
      where: { id:{[this.Op.in]: userIds }},
      raw: true
    });
    return users
  }
  async saveBehaviorData(userId, itemId, score) { // 保存用户行为数据
    let recommender = this.app.recommender;
    let res = await recommender.loadDataSet({ [userId]: { [itemId]: score } });
    this.app.Queue.get('refreshUsers').add(userId);
  }

}
module.exports = SystemService;
