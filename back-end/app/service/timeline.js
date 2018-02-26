'use strict';

const Service = require('../core/base_service');

class TimelineService extends Service {
  constructor(ctx) {
    super(ctx);
    this.recommender = ctx.app.recommender;
  }
  async constructWhere(ids) {
    let res = ids.map((id) => `'${id}'`).join(",")
    return ` (${res}) `;
  }
  async getHottestItem(userId) { // 热度

  }
  async getRecentItem(userId) { // 最新的
    let tags = await this.getService('tag').getTagByUser(userId);
    let sql = 'select distinct question_id from question_tag_relation where tag_id in' + constructWhere(tags)
    let questionIds = await this.rawQuery(sql);
    return this.getQuestions(questionIds);
  }
  async getRecommendedItem(userId) { // 推荐的
    let questionsIds = await this.recommender.getRecommendedItemsFromCache(userId);
    if (questionsIds == null) {
      return this.getRecentItem(userId);
    }
    return this.getQuestions(questionIds);
  }
  async getSimilarUser(userId) {
    let userIds = await this.recommender.getSimilarUsersFromCache(userId,{count:3});
    if(userids == null){
      return null;
    }
    let users = await this.getDao('User').findAll({
      where: { id:{[this.Op.in]: userids }},
      raw: true
    });
    return users
  }
  async getQuestions(questionIds) {
    let questions = await this.getDao('Question').findAll({
      where: { id:{[this.Op.in]: questionIds }},
      include: [
        { model: ctx.model.Tag, as: "tag" },
        { model: ctx.model.User, as: "creator" },
      ],
      order: [['created_at', 'DESC']],
    });
    return questions;
  }
}

module.exports = TimelineService;
