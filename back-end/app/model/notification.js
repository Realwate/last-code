'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE, TEXT, BOOLEAN } = app.Sequelize;
  let Notification = app.model.define('notification', {
    id: {
      type: STRING(32),
      defaultValue: util.uuidv1,
      primaryKey: true,
    },
    userId: { // 谁的通知
      type: STRING(32),
    },
    actor: { // 主角
      type: STRING(32),
    },
    target: { // 目标
      type: STRING(32),
    },
    action: { // 做了什么
      type: STRING,
    },
    viewed: { // 是否已经查看
      type: BOOLEAN,
      defaultValue: false,
    },
    createdAt: DATE,
    updatedAt: DATE,
  }, {
      indexes: [
        {
          fields: ['user_id'],
        }],
    });

  Notification.associate = function () {
  };

  return Notification;
};
