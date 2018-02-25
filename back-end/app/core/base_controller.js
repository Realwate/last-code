const { Controller } = require('egg');
const JSONResult = require('./json_result');
const util = require('../util');
const validator = require('./validator');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.validator = validator;
    this.service = ctx.service[this.serviceName];
  }
  get serviceName(){
    throw Error('unsuport operation!');
  }
  get userId(){
    return this.ctx.request.userId;
  }
  get body(){
    return this.ctx.request.body;
  }
  success(data) {
    JSONResult.wrap(null, data, this.ctx);
  }
  throwError(msg) {
    if (msg.join) {
      msg = msg.join('\n');
    }
    util.throwError(msg);
  }
  async validate(rule, data = this.ctx.request.body) {
    for (let prop of Object.keys(rule)) {
      // 校验data的一个属性
      let validators = rule[prop];
      let msg = await this.validator.validate(validators, data[prop]);
      msg && this.throwError(msg);
    }
  }
}
module.exports = BaseController;
