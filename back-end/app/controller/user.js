'use strict';

const Controller = require('../core/base_controller');
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'user';
  }
  async getAllFollowing() {
    let userId = this.ctx.params.userId;
    let users = await this.service.getFollowingUsers(userId, this.loggedInUserId, this.page);
    let questions = await this.service.getFollowingQuestions(userId, this.page);
    this.success({ users, questions });
  }
  async getFollowingUsers() {
    let viewingUserId = this.ctx.params.userId;
    let res = await this.service.getFollowingUsers(viewingUserId, this.loggedInUserId, this.page)
    this.success(res);
  }
  async getFollowingQuestions() {
    let userId = this.ctx.params.userId;
    let res = await this.service.getFollowingQuestions(userId, this.page)
    this.success(res);
  }
  async addFollower() {
    let userId = this.ctx.params.userId;
    let followerId = this.loggedInUserId;
    let res = await this.service.addFollower(userId, followerId)
    this.success();
  }
  async deleteFollower() {
    let userId = this.ctx.params.userId;
    let followerId = this.loggedInUserId;
    let res = await this.service.deleteFollower(userId, followerId)
    this.success();
  }
  async create() { // 创建
    const ctx = this.ctx;
    const createdUser = await this.service.create(this.body);
    this.returnUserToken(createdUser);
  }
  async show() { // 查询单个用户
    const id = this.ctx.params.id;
    let user = await this.service.getUserProfile(id, this.loggedInUserId);
    this.success(user);
  }
  async update() { // patch 增量更新
    const id = this.ctx.params.id;
    let user = await this.service.update(id, this.body);
    this.success(user);
  }
  async login() {
    const ctx = this.ctx;
    const user = await this.service.findOneByFilter(this.body);
    user == null && this.throwError('账号或密码不正确！');
    this.returnUserToken(user);
  }
  returnUserToken(user){
    this.success(this.createToken({ userId: user.id, name: user.name }));
  }
  createToken(info) {
    const jwt = require('jsonwebtoken');
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + this.app.config.system.maxAge);// 有效天数

    // 签名算法 default HS256
    const data = {
      exp: parseInt(expiry.getTime() / 1000),
      data: info,
    };
    // data stringfy后 使用base64编码
    const token = jwt.sign(data, this.ctx.app.config.keys);
    return token;
  }
}

module.exports = UserController;
