const jwt = require('jsonwebtoken');
module.exports = (options, app) => {
  return async function authorizationHandler(ctx, next) {
    const req = ctx.request;
    const authorization = req.headers.authorization;
    if (!authorization) {
      app.util.throwError('请先登录');
    }
    // 空格隔开的两段 Bearer <token> 第二段是jwt token
    const token = authorization.split(' ')[1];
    if (!token) {
      app.util.throwError('请先登录');
    }

    try {
      const decoded = jwt.verify(token, ctx.app.config.keys);
      // 如果过期了就重新登录
      if (decoded.exp <= Date.now() / 1000) {
        throw new Error('');
      }
      req.userId = decoded.data.userId;
    } catch (err) {
      app.util.throwError('授权已经过期，请重新登陆');
    }
    await next();
  };
};
