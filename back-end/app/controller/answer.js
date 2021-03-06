'use strict';
const Controller = require('../core/base_controller');

class AnswerController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'answer';
  }
  async addVote() {
    let answerId = this.ctx.params.answerId;
    let res = await this.service.addVote(answerId, this.loggedInUserId, this.body);
    this.success(res);
  }
  async deleteVote() {
    let answerId = this.ctx.params.answerId;
    let res = await this.service.deleteVote(answerId, this.loggedInUserId, this.body);
    this.success(res);
  }
  async create() {
    let res = await this.service.create(this.loggedInUserId, this.body);
    this.success(res);
  }
  async getAnswerByUser() {
    let userId = this.ctx.params.userId;
    let res = await this.service.getAnswerByUser(userId, this.page);
    this.success(res);
  }
}

module.exports = AnswerController;
