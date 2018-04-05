'use strict';
const Controller = require('../core/base_controller');

class NotificationController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'notification';
  }
  async getNotifications() {
    let res = await this.service.getNotificationByUser(this.loggedInUserId, this.page);
    this.success(res);
  }
  async updateViewed() {
    let id = this.ctx.params.notificationId;
    let res = await this.service.updateViewed(id);
    this.success(res);
  }
}

module.exports = NotificationController;
