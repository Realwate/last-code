'use strict';

const Controller = require('../core/base_controller');

class TimelineController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'timeline';
  }
  async getHottestItem() {
    let res = await this.service.getHottestItem(this.loggedInUserId);
    this.success(res);
  }
  async getRecentItem() {
    let res = await this.service.getRecentItem(this.loggedInUserId, this.page);
    this.success(res);
  }
  async getRecommendedItem() {
    let res = await this.service.getRecommendedItem(this.loggedInUserId, this.page);
    this.success(res);
  }
}

module.exports = TimelineController;
