'use strict';

const Controller = require('../core/base_controller');

class QuestionController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'question';
  }
  async create() {
    let res = await this.service.create(this.userId, this.body);
    this.success({ id: res.id });
  }
  async getQuestionByUser() {
    let userId = this.ctx.params.userId;
    let res = await this.service.getQuestionByUser(userId);
    this.success(res);
  }
  async addFollower() {
    let questionId = this.ctx.params.questionId;
    let followerId  = this.userId;
    let res = await this.service.addFollower(questionId,followerId)
    this.success();
  }
  async deleteFollower() {
    let questionId = this.ctx.params.questionId;
    let followerId  = this.userId;
    let res = await this.service.deleteFollower(questionId,followerId)
    this.success();
  }
}

module.exports = QuestionController;
