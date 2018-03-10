'use strict';

const Service = require('../core/base_service');

class QuestionService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'Question'
  }
  // 创建问题
  async create(userId, params) { // 参照model, model
    let user = await this.getService('user').findById(userId);
    this.merge(params, { user_id: userId });
    let tagIds = params.tags.map(tag => tag.id);

    let question = await this.dao.create(params);
    for (let tagId of tagIds) {
      let tag = await this.getService('tag').findById(tagId);
      tag.increment('item_count', { by: 1 });
      question.addTag(tag);
    }
    user.increment('question_count', { by: 1 });
    // 更新 矩阵
    // this.getService('system').saveBehaviorData(userId, question.id, this.app.config.behavior.question);
    return question;
  }
  async getQuestionDetail(questionId, userId) {
    let ctx = this.ctx;
    let question = await this.dao.findOne({
      where: {
        id: questionId
      },
      include: [
        { model: ctx.model.Tag, as: 'tags' },
        {
          model: ctx.model.Answer, as: 'answers', include: [
            { model: ctx.model.User, as: 'author' }
          ]
        },
        { model: ctx.model.User, as: 'creator' },
      ]
    });
    let follows = await this.rawQuery('select * from user_follow_question_relation where user_id=? and question_id=?', userId, questionId)
    return this.jsonModel(question, { hasFollowed: follows.length > 0 });
  }
  async queryQuestionByKeywords(keywords) {
    let questions = await this.dao.findAll({
      where: {
        title: {
          [this.Op.like]: `%${keywords}%`
        }
      }
    })
    let ids = questions.map((q) => q.id);
    if(ids.length == 0){
      return [];
    }
    return this.getQuestionByIds(ids);
  }
  async addVote(questionId, userId, { main }) { // 参照model, model
    let user = await this.getService('user').findById(userId);
    let question = await this.findById(questionId);
    if (!user || !question) {
      this.throwError();
    }
    await question.increment('vote_count', { by: 1 });
    await this.deleteVote();
    let questionVote = await this.getDao('QuestionVote').create(main);
    await questionVote.setUser(user);
    await questionVote.setQuestion(question);

    return questionVote;
  }
  async deleteVote(questionId, userId) {
    let question = await this.findById(questionId);
    let res = await this.rawQuery('delete from question_vote where user_id = ? and question_id = ', userId, questionId);
    if (res) {
      question.increment('vote_count', { by: -1 });
    }
    return res;
  }
  async addViews(userId, questionId) { // 浏览量
    let question = await this.findById(questionId);
    question.increment('views', { by: 1 })
    // 更新 矩阵
    this.getService('system').saveBehaviorData(userId, question.id, this.app.config.behavior.view);
  }
  async getQuestionByUser(userId) {
    let questions = await this.getEntryQuestions({
      user_id: userId
    });
    return questions;
  }
  async getQuestionByIds(questionIds) {
    let whereClause = null;
    if (questionIds) {
      whereClause = { id: { [this.Op.in]: questionIds } }
    }
    return this.getEntryQuestions(whereClause);
  }
  async getEntryQuestions(whereClause) {
    const ctx = this.ctx;
    let questions = await this.dao.findAll({
      where: whereClause,
      include: [
        { model: ctx.model.Tag, as: "tags" },
        { model: ctx.model.User, as: "creator" },
      ],
      order: [['created_at', 'DESC']],
      offset: 0,
      limit: 20
    });
    return questions;
  }
  async addFollower(questionId, followerId) {
    let question = await this.findById(questionId);
    let follower = await this.getService('user').findById(followerId);
    let res = await question.hasFollower(follower);
    if (res) {
      this.throwError();
    }
    await question.increment('follower_count', { by: 1 });
    await question.addFollower(follower);

    // 更新 矩阵
    this.getService('system').saveBehaviorData(followerId, question.id, this.app.config.behavior.question);
  }
  async deleteFollower(questionId, followerId) {
    let question = await this.findById(questionId);
    let follower = await this.getService('user').findById(followerId);
    let res = await question.hasFollower(follower);
    if (!res) {
      this.throwError();
    }
    await question.increment('follower_count', { by: -1 });
    question.removeFollower(follower);
    // 更新 矩阵
    this.getService('system').saveBehaviorData(followerId, question.id, this.app.config.behavior.question * -1);
  }
}

module.exports = QuestionService;
