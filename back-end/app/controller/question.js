'use strict';

const Controller = require('../core/base_controller');

class QuestionController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'question';
  }
  async queryQuestionByKeywords() {
    let keywords = this.ctx.query.keywords;
    let res = await this.service.queryQuestionByKeywords(keywords, this.page);
    this.success(res);
  }
  async show() {
    let questionId = this.ctx.params.questionId;
    let res = await this.service.getQuestionDetail(questionId, this.loggedInUserId);
    this.success(res);
  }
  async create() {
    let res = await this.service.create(this.loggedInUserId, this.body);
    this.success({ id: res.id });
  }
  async addVote() {
    let questionId = this.ctx.params.questionId;
    let res = await this.service.addVote(questionId, this.loggedInUserId, this.body);
    this.success(res);
  }
  async deleteVote() {
    let questionId = this.ctx.params.questionId;
    let res = await this.service.deleteVote(questionId, this.loggedInUserId, this.body);
    this.success(res);
  }
  async getQuestionByUser() {
    let userId = this.ctx.params.userId;
    let res = await this.service.getQuestionByUser(userId, this.page);
    this.success(res);
  }
  async addFollower() {
    let questionId = this.ctx.params.questionId;
    let followerId = this.loggedInUserId;
    let res = await this.service.addFollower(questionId, followerId)
    this.success();
  }
  async deleteFollower() {
    let questionId = this.ctx.params.questionId;
    let followerId = this.loggedInUserId;
    let res = await this.service.deleteFollower(questionId, followerId)
    this.success();
  }
  async addViews() {
    let questionId = this.ctx.params.questionId;
    let res = await this.service.addViews(this.loggedInUserId, questionId)
    this.success();
  }
}

module.exports = QuestionController;
