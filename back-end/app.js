'use strict';
module.exports = app => {
  // 自定义规则 通过函数校验
  // app.validator.addRule('customRule', (rule, value) => {
  //   let errorMsg;
  //   rule.validators
  //     .some(async validator => errorMsg = validator(value));
  //   return errorMsg;
  // });

  app.beforeStart(async function() {
    // 应用会等待这个函数执行完成才启动
    await app.model.sync();
    // await app.model.sync({force: true});
  });
};
