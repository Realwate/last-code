'use strict';

const Controller = require('../core/base_controller');
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.commonService = ctx.service.common.model('User');
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
  async create() {
    const ctx = this.ctx;
    await this.validate(this.createRule());
    const createdUser = await ctx.service.user.create(ctx.request.body);
    this.success(createdUser);
  }
  async nameCanUse(name) {
    const user = await this.commonService.findOneByFilter({ name });
    return user == null;
  }
  async login() {
    const ctx = this.ctx;
    const user = await this.commonService.findOneByFilter(ctx.request.body);
    user == null && this.throwError('账号或密码不正确！');
    this.success(this.createToken({ name: user.name }));
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
