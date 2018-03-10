'use strict';

const Service = require('../core/base_service');

class TimelineService extends Service {
  constructor(ctx) {
    super(ctx);
    this.recommender = ctx.app.recommender;
  }
  async getHottestItem(userId) { // 热度

  }
  async getRecentItem(userId) { // 最新的
    let followedTags = await this.getService('tag').getUserTag(userId);
    let questionIds;
    if (followedTags == null || followedTags.length == 0) { // 没有关注tag
      return this.getQuestionByIds();
    }
    let tagIds = followedTags.map((tag) => tag.id);
    let sql = 'select distinct question_id from question_tag_relation where tag_id in' + this.constructWhere(tagIds)
    questionIds = await this.rawQuery(sql);

    return this.getQuestionByIds(questionIds.map((obj) => obj.question_id));
  }
  async getRecommendedItem(userId) { // 推荐的
    let questionIds = await this.recommender.getRecommendedItemsFromCache(userId, { count: 20 });
    if (questionIds == null) {
      return this.getRecentItem(userId);
    }
    return this.getQuestionByIds(questionIds);
  }
  async getQuestionByIds(questionIds) {
    return this.getService('question').getQuestionByIds(questionIds);
  }
}

module.exports = TimelineService;
