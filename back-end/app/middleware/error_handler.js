// 统一异常处理

const JSONResult = require('../core/json_result');
const BusinessError = require('../core/business_error');
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      JSONResult.wrap(err, null, ctx);
      // 业务错误 直接返回
      if (err instanceof BusinessError) {
        return;
      }
      // 其他运行时错误
      ctx.app.emit('error', err, ctx);
      ctx.logger.error(err);
      if (ctx.app.config.env === 'prod') {
        JSONResult.wrap({ message: 'Internal server error' }, null, ctx);
      }
    } finally {
      if (ctx.app.env == 'local') {
        const res = ctx.response;
        res.set('Access-Control-Allow-Origin', '*');
        // 允许跨域请求的head字段
        res.set('Access-Control-Allow-Headers', 'Authorization,Origin, X-Requested-With, Content-Type, Accept');
        res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      }
    }
  };
};
