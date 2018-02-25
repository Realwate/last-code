'use strict';

const Controller = require('../core/base_controller');
class SystemController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName(){
    return 'system';
  }
  async getSystemInfo() {
    let result = await this.service.getSystemInfo();
    this.success(result);
  }
}

module.exports = SystemController;
