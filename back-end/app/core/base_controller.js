const { Controller } = require('egg');
const JSONResult = require('./json_result');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service[this.serviceName];
  }
  get serviceName() {
    throw Error('unsuport operation!');
  }
  get loggedInUserId() {
    return this.ctx.request.loggedInUserId;
  }
  get body() {
    return this.ctx.request.body;
  }
  get page() {
    let pageNum = Number(this.ctx.query.pageNum) || 0;
    let limit = Number(this.ctx.query.limit) || this.app.config.system.api.limit;
    return {
      offset: pageNum * limit,
      limit
    }
  }
  getService(name) {
    return this.ctx.service[name];
  }
  success(data) {
    JSONResult.wrap(null, data, this.ctx);
  }
  throwError(msg) {
    if (msg.join) {
      msg = msg.join('\n');
    }
    this.app.util.throwError(msg);
  }
}
module.exports = BaseController;
