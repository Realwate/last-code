'use strict';

const Service = require('../core/base_service');
class SystemService extends Service {
  async getSystemInfo() {
    return Promise.all([
      this.getService('user').count(),
      this.getService('question').count(),
      this.getService('answer').count()
    ]).then(([userCount, questionCount, answerCount]) => {
      return {
        userCount, questionCount, answerCount
      }
    })
  }
}
module.exports = SystemService;
