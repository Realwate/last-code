const { Controller } = require('egg');
const JSONResult = require('./json_result');
const util = require('../util');
const validator = require('./validator');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.validator = validator;
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
