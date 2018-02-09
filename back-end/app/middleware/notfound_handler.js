const path = require('path');
const fs = require('fs');
const util = require('../util')

const indexPath = path.join(__dirname, '../public/index.html');
async function readIndexContent(ctx) {
  return new Promise((resolve, reject) => {
    fs.readFile(indexPath, (err, content) => {
      if (err) {
        throw err;
      }
      resolve(content);
    });
  });
}

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.logger.info('default handler');
      if (ctx.acceptJSON) { // JSON数据
        util.throwError('error request')
      } else { // 返回Index
        ctx.body = await readIndexContent(ctx);
        ctx.status = 200;
        ctx.set('Cache-Control', 'no-cache');
        ctx.set('Content-Type', 'text/html; charset=utf-8');
      }
    }
  };
};
