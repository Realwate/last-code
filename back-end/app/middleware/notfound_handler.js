const path = require('path');
const fs = require('fs');
const util = require('../util')
const readFile = require('util').promisify(fs.readFile)

const indexPath = path.join(__dirname, '../public/index.html');

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON || ctx.request.type.includes('json')) { // JSON数据
        util.throwError('error request')
      } else { // 返回Index
        ctx.body = await readFile(indexPath);
        ctx.status = 200;
        ctx.set('Cache-Control', 'no-cache');
        ctx.set('Content-Type', 'text/html; charset=utf-8');
      }
    }
  };
};
