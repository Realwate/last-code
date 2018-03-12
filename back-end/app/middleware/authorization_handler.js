const jwt = require('jsonwebtoken');
const BusinessError = require('../core/business_error');
module.exports = (options, app) => {
  return async function authorizationHandler(ctx, next) {
    const errCode = BusinessError.ERROR.LOGIN
    const req = ctx.request;
    const authorization = req.headers.authorization;
    if (!authorization) {
      app.util.throwError('请先登录', errCode);
    }
    // 空格隔开的两段 Bearer <token> 第二段是jwt token
    const token = authorization.split(' ')[1];
    if (!token) {
      app.util.throwError('请先登录', errCode);
    }

    try {
      const decoded = jwt.verify(token, ctx.app.config.keys);
      // 过期
      if (decoded.exp <= Date.now() / 1000) {
        throw Error('');
      }
      req.loggedInUserId = decoded.data.userId; // 需要权限的操作加上loggedInUserId
    } catch (err) {
      app.util.throwError('授权已经过期，请重新登陆', errCode);
    }
    await next();
  };
};
