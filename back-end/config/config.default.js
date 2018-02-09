'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1517665391204_9001';

  config.middleware = [ 'gzip','authorizationHandler','notfoundHandler','errorHandler', ];
  config.errorHandler = {
    match: '/api',
  };

  config.authorizationHandler = {
    ignore(ctx) { // 不需要验证的path
      const ignorePaths = [ '/api/login', '/api/signup' ];
      return ignorePaths.some(path => ctx.path.startsWith(path));
    },
  };
  config.gzip = { // 针对API JSON的压缩
    threshold: 1024, // 小于 1k 的响应体不压缩
  };
  config.static = { // 静态资源插件 /public
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
  };
  config.security = { // 不需要 csrf token
    methodnoallow: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
  config.sequelize = { // sequelize orm 配置
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'test',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    timestamps: true,
  };

  return config;
};
