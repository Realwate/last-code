const Subscription = require('egg').Subscription;

class UpdateRecommend extends Subscription {
  static get schedule() {
    return {
      interval: '5m', // 1 分钟间隔
      type: 'worker', // all指定所有的 worker 都需要执行
      disable: true
    };
  }
  async subscribe() {
    let recommender = this.ctx.app.recommender;
    let Queue = this.ctx.app.Queue;
    let userIds = await Queue.get('refreshUsers').getAll();
    if(userIds == null){
      return ;
    }
    for(let userId of userIds){
      await recommender.refreshRecommendations(userId);
      this.ctx.app.logger.info(`用户 ${userId} 刷新推荐数据...`)
    }
  }
}

module.exports = UpdateRecommend;