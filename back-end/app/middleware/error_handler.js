// 统一异常处理
const JSONResult = require('../core/json_result');
const BusinessError = require('../core/business_error');
module.exports = (options,app) => {
  const OptimisticLockError = app.Sequelize.OptimisticLockError
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      if(err instanceof OptimisticLockError){
        JSONResult.error('当前数据已被修改，请刷新!', ctx);
        return;
      }
      // 业务错误 直接返回
      if (err instanceof BusinessError) {
        JSONResult.wrap(err, null, ctx);
        return;
      }
      // 其他运行时错误
      ctx.app.emit('error', err, ctx);
      ctx.logger.error(err);
      JSONResult.wrap('Internal server error', null, ctx);
    } finally {
      if (ctx.app.config.env == 'local') {
        // 跨域请求
        const res = ctx.response;
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', 'Authorization,Origin, X-Requested-With, Content-Type, Accept');
        res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      }
    }
  };
};
