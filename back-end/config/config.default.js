'use strict';
const moment = require('moment')
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
    operatorsAliases:false,
    timezone: '+08:00' ,
    hooks:{
      beforeDefine:(model,options)=>{ // 格式化时间
        let Sequelize = options.sequelize.constructor;
        model.created_at = {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
          }
        }
        model.updated_at = {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
          }
        }
      }
    },
    define: {
      underscored: true, // 字段以下划  线（_）来分割（默认是驼峰命名风格）
      version: true, // app.sequelize.OptimisticLockError
      freezeTableName: true,
      timestamps: true,
      // paranoid: true, // 逻辑删除
    }
  };
  config.redis = { // redis配置
    client: {
      port: 6379,          // Redis port
      host: 'localhost',   // Redis host
      password: '',
      db: 0,
    },
  };
  config.recommender = {
    dataAccesor:{

    }
  }
  config.logger = {
    consoleLevel: 'DEBUG',
  }
  return config;
};
