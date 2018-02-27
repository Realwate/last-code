'use strict';

const Service = require('../core/base_service');
class SystemService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  async getSystemInfo() {
    return Promise.all([
      this.getService('user').count(),
      this.getService('question').count(),
      this.getService('answer').count()
    ]).then(([userCount, questionCount, answerCount]) => {
      return {
        userCount, questionCount, answerCount
      }
    })
  }
  async saveBehaviorData(userId, itemId, score) { // 保存用户行为数据
    let recommender = this.app.recommender;
    let res = await recommender.loadDataSet({ [userId]: { [itemId]: score } });
    this.app.Queue.get('refreshUsers').add(userId);
  }

}
module.exports = SystemService;
