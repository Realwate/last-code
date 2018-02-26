// app.js
module.exports = app => {
  // 使用 app 对象
  // const moment = require('moment');
  // app.sequelize.addHook('beforeDefine', () => {
  //   // 做些什么
  // });
  const QueueManger = require('../core/message_queue');
  app.Queue = new QueueManger(app);
};
