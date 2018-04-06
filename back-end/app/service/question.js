'use strict';

const Service = require('../core/base_service');

class QuestionService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'Question'
  }
  get createRule() {
    return {
      fields: ['title', 'content', 'user_id'],
      rule: {
        title: [
          this.Validator.require('标题不能为空！'),
        ],
        content: [
          this.Validator.require('内容不能为空！'),
        ],
        tags: [
          this.Validator.require('所属标签不能为空！'),
        ],
      }
    }
  }
  // 创建问题
  async create(userId, params) {
    let user = await this.validateUser(userId);
    this.merge(params, { user_id: userId });
    let tagIds = params.tags.map(tag => tag.id);
    let question = await super.create(params);
    this.getService('notification').addQuestionCreateMsg(user, question.id);
    for (let tagId of tagIds) {
      let tag = await this.getService('tag').findById(tagId);
      tag.increment('item_count', { by: 1 });
      question.addTags(tag);
    }
    user.increment('question_count', { by: 1 });
    return this.jsonModel(question, { creator: user });;
  }
  async addViews(userId, questionId) { // 浏览量
    let question = await this.findById(questionId);
    question.increment('views', { by: 1 })
    // 更新 矩阵
    this.getService('system').saveBehaviorData(userId, question.id, this.app.config.behavior.view);
  }
  async addFollower(questionId, followerId) {
    let question = await this.findById(questionId);
    let follower = await this.getService('user').findById(followerId);
    let hasFollowed = await question.hasFollower(follower);
    if (hasFollowed) {
      return;
    }
    question.increment('follower_count', { by: 1 });
    question.addFollower(follower);

    // 更新 矩阵
    this.getService('system').saveBehaviorData(followerId, question.id, this.app.config.behavior.question);
  }
  async deleteFollower(questionId, followerId) {
    let question = await this.findById(questionId);
    let follower = await this.getService('user').findById(followerId);
    let hasFollowed = await question.hasFollower(follower);
    if (!hasFollowed) {
      return;
    }
    question.increment('follower_count', { by: -1 });
    question.removeFollower(follower);
    // 更新 矩阵
    this.getService('system').saveBehaviorData(followerId, question.id, this.app.config.behavior.question * -1);
  }
  async addVote(questionId, userId, params) {
    let user = await this.getService('user').findById(userId);
    let question = await this.findById(questionId);
    if (!user || !question) {
      this.throwError();
    }
    await question.increment('vote_count', { by: 1 });
    await this.deleteVote();
    let questionVote = await this.getDao('QuestionVote').create(params);
    await questionVote.setUser(user);
    await questionVote.setQuestion(question);

    return questionVote;
  }
  async deleteVote(questionId, userId) {
    let question = await this.findById(questionId);
    let res = await this.rawQuery(
      'delete from question_vote where user_id = ? and question_id = ?', userId, questionId);
    if (res) {
      question.increment('vote_count', { by: -1 });
    }
    return res;
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
    if (question == null) {
      return null;
    }
    let follows = await this.rawQuery(
      'select * from user_follow_question_relation where user_id=? and question_id=?', userId, questionId)
    return this.jsonModel(question, { hasFollowed: follows.length > 0 });
  }
  async queryQuestionByKeywords(keywords, page) {
    let questions = await this.dao.findAll({
      where: {
        title: {
          [this.Op.like]: `%${keywords}%`
        }
      },
      ...page
    })
    let ids = questions.map((q) => q.id);
    if (ids.length == 0) {
      return [];
    }
    return this.getQuestionByIds(ids);
  }
  async getQuestionByUser(userId, page) {
    return this.getEntryQuestions({ user_id: userId }, page);
  }
  async getQuestionByIds(questionIds) {
    if (!questionIds) {
      return [];
    }
    let whereClause = { id: { [this.Op.in]: questionIds } }
    return this.getEntryQuestions(whereClause);
  }
  async getEntryQuestions(whereClause, page = {}) {// 通过getQuestionByIds调用的没有page
    const ctx = this.ctx;
    let questions = await this.dao.findAll({
      where: whereClause,
      include: [
        { model: ctx.model.Tag, as: "tags" },
        { model: ctx.model.User, as: "creator" },
      ],
      order: [['created_at', 'DESC']],
      ...page
    });
    return questions;
  }
}

module.exports = QuestionService;
