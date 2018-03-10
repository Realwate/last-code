'use strict';

const Controller = require('../core/base_controller');

class TagController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'tag';
  }
  async create() {
    let res = await this.service.create(this.loggedInUserId, this.body);
    this.success({ id: res.id });
  }
  async addFollower() {
    let tagId = this.ctx.params.tagId;
    let followerId = this.loggedInUserId;
    let res = await this.service.addFollower(tagId, followerId)
    this.success(res);
  }
  async deleteFollower() {
    let tagId = this.ctx.params.tagId;
    let followerId = this.loggedInUserId;
    let res = await this.service.deleteFollower(tagId, followerId)
    this.success(res);
  }
  async getAllTag() {
    let res = await this.service.getAllTag(this.loggedInUserId); // 需要得到是否关注
    this.success(res);
  }
  async getTagDetail() {
    let tagId = this.ctx.params.tagId;
    let res = await this.service.getTagDetail(tagId, this.loggedInUserId);
    this.success(res);
  }
  async queryTagByKeywords() {
    let keywords = this.ctx.query.keywords;
    let res = await this.service.queryTagByKeywords(keywords,this.loggedInUserId);
    this.success(res);
  }
  async getUserTag() {
    let userId = this.ctx.params.userId;
    let res = await this.service.getUserTag(userId);
    this.success(res);
  }
}

module.exports = TagController;
