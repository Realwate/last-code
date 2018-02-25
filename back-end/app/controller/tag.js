'use strict';

const Controller = require('../core/base_controller');

class TagController extends Controller {
  constructor(ctx){
    super(ctx);
  }
  get serviceName(){
    return 'tag';
  }
  async create(){
    let res = await this.service.create(this.userId,this.body);
    this.success({id:res.id});
  }
  async addFollower(){
    let tagId = this.ctx.params.tagId;
    let followerId  = this.userId;
    let res = await this.service.addFollower(tagId,followerId)
    this.success();
  }
  async deleteFollower(){
    let tagId = this.ctx.params.tagId;
    let followerId  = this.userId;
    let res = await this.service.deleteFollower(tagId,followerId)
    this.success();
  }
}

module.exports = TagController;
