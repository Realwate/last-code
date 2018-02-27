'use strict';

const Controller = require('../core/base_controller');
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName(){
    return 'user';
  }
  createRule() {
    return {
      name: [
        this.validator.require('用户名不能为空！'),
        this.validator.custom('用户名已存在！', (name) => this.nameCanUse(name)),
      ],
      password: [
        this.validator.require('密码不能为空！'),
        this.validator.match('密码必须由字母数字组成！', /(?=\D*\d)(?=.*[a-zA-Z])/),
      ],
    };
  }
  async getFollowingUsers(){
    let userId = this.ctx.params.userId;
    let res = await this.service.getFollowingUsers(userId)
    this.success(res);
  }
  async getFollowingQuestions(){
    let userId = this.ctx.params.userId;
    let res = await this.service.getFollowingQuestions(userId)
    this.success(res);
  }
  async getFollowingTags(){
    let userId = this.ctx.params.userId;
    let res = await this.service.getFollowingTags(userId)
    this.success(res);
  }
  async addFollower(){
    let userId = this.ctx.params.userId;
    let followerId  = this.userId;
    let res = await this.service.addFollower(userId,followerId)
    this.success();
  }
  async deleteFollower(){
    let userId = this.ctx.params.userId;
    let followerId  = this.userId;
    let res = await this.service.deleteFollower(userId,followerId)
    this.success();
  }
  async create() { // 创建
    const ctx = this.ctx;
    await this.validate(this.createRule());
    const createdUser = await this.service.create(this.body);
    this.success(createdUser);
  }
  async show(){ // 查询单个用户
    const id = this.ctx.params.id;
    let user = await this.service.getUserProfile(id);
    this.success(user);
  }
  async update(){ // patch 增量更新
    const id = this.ctx.params.id;
    let user = await this.service.update(id);
    this.success(user);
  }
  async nameCanUse(name) {
    const user = await this.service.findOneByFilter({ name });
    return user == null;
  }
  async login() {
    const ctx = this.ctx;
    const user = await this.service.findOneByFilter(this.body);
    user == null && this.throwError('账号或密码不正确！');
    this.success(this.createToken({ userId:user.id,name: user.name }));
  }
  createToken(info) {
    const jwt = require('jsonwebtoken');
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);// 有效期设置为七天

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
