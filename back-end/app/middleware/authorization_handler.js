const jwt = require('jsonwebtoken');
const BusinessError = require('../core/business_error');
module.exports = (options, app) => {
  return async function authorizationHandler(ctx, next) {
    let code = BusinessError.ERROR.LOGIN
    const req = ctx.request;
    const authorization = req.headers.authorization;
    if (!authorization) {
      app.util.throwError('请先登录', code);
    }
    // 空格隔开的两段 Bearer <token> 第二段是jwt token
    const token = authorization.split(' ')[1];
    if (!token) {
      app.util.throwError('请先登录', code);
    }

    try {
      const decoded = jwt.verify(token, ctx.app.config.keys);
      // 如果过期了就重新登录
      if (decoded.exp <= Date.now() / 1000) {
        throw new Error('');
      }
      req.loggedInUserId = decoded.data.userId;
    } catch (err) {
      app.util.throwError('授权已经过期，请重新登陆', code);
    }
    await next();
  };
};
