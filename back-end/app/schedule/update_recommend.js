const Subscription = require('egg').Subscription;

class UpdateRecommend extends Subscription {
  static get schedule() {
    return {
      interval: '10m', // 间隔
      type: 'worker', // all指定所有的 worker 都需要执行
      disable: false
    };
  }
  async subscribe() {
    let recommender = this.ctx.app.recommender;
    let Queue = this.ctx.app.Queue;
    let userIds;
    if (this.ctx.app.env == 'unittest') {
      userIds = await Queue.get('refreshUsers').popAll(false);
    } else {
      userIds = await Queue.get('refreshUsers').popAll();
    }

    if (userIds == null) {
      return;
    }
    this.ctx.app.logger.info(`准备刷新推荐数据，user数量${userIds.length}...`)
    for (let userId of userIds) {
      await recommender.refreshRecommendations(userId);
      this.ctx.app.logger.info(`用户 ${userId} 刷新推荐数据...`)
    }
    this.ctx.app.logger.info(`刷新完毕...`)
  }
}

module.exports = UpdateRecommend;
