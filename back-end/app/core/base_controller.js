const { Controller } = require('egg');
const JSONResult = require('./json_result');

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
  get page(){
    return{
      offset: this.ctx.query.offset || this.app.config.system.api.offset,
      limit: this.ctx.query.limit || this.app.config.system.api.limit,
    }
  }
  getService(name){
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
