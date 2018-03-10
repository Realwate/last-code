const { Controller } = require('egg');
const JSONResult = require('./json_result');
const util = require('../util');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service[this.serviceName];
  }
  get serviceName(){
    throw Error('unsuport operation!');
  }
  get loggedInUserId(){
    return this.ctx.request.loggedInUserId;
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
}
module.exports = BaseController;
