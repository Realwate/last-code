'use strict';

const Controller = require('../core/base_controller');

class TimelineController extends Controller {
  constructor(ctx){
    super(ctx);
  }
  get serviceName(){
    return 'timeline';
  }
  async getHottestItem(){
    let res = await this.service.getHottestItem(this.userId);
    this.success(res);
  }
  async getRecentItem(){
    let res = await this.service.getRecentItem(this.userId);
    this.success(res);
  }
  async getRecommendedItem(){
    let res = await this.service.getRecommendedItem(this.userId);
    this.success(res);
  }
}

module.exports = TimelineController;
