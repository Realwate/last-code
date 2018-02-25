'use strict';
const Controller = require('../core/base_controller');

class AnswerController extends Controller {
  constructor(ctx){
    super(ctx);
  }
  get serviceName(){
    return 'answer';
  }
  async create(){
    let res = await this.service.create(this.userId,this.body);
    this.success({id:res.id});
  }
  async getAnswerByUser(){
    let userId = this.ctx.params.userId;
    let res = await this.service.getAnswerByUser(userId);
    this.success(res);
  }
}

module.exports = AnswerController;
