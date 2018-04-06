'use strict';

const Service = require('../core/base_service');

class TimelineService extends Service {
  constructor(ctx) {
    super(ctx);
    this.recommender = ctx.app.recommender;
  }
  async getHottestItem(userId) { // 热度

  }
  async getRecentItem(userId, page) { // 最新的
    let followedTags = await this.getService('tag').getUserTag(userId);
    if (followedTags == null || followedTags.length == 0) { // 没有关注tag
      return this.getService('question').getEntryQuestions(null, page);
    }
    let tagIds = followedTags.map((tag) => tag.id);
    let sql = ` select distinct question_id from question_tag_relation
    where tag_id in ${this.constructWhere(tagIds)} limit ${page.limit} offset ${page.offset};`;
    let questionIds = (await this.rawQuery(sql)).map((obj) => obj.question_id);
    if (questionIds.length == 0) {
      return [];
    }
    return this.getQuestionByIds(questionIds);
  }
  async getRecommendedItem(userId, page) { // 推荐的
    // page[offset,limit) 转换 options [start,count)
    let questionIds = await this.recommender
      .getRecommendedItemsFromCache(userId, { start: page.offset, count: page.limit });
    if (questionIds == null && page.offset === 0) {
      // return this.getRecentItem(userId, page);
      return [];
    }
    return this.getQuestionByIds(questionIds);
  }
  async getQuestionByIds(questionIds) {
    return this.getService('question').getQuestionByIds(questionIds);
  }
}

module.exports = TimelineService;
