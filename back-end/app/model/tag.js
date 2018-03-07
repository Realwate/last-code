'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE, TEXT, BOOLEAN } = app.Sequelize;
  const Tag = app.model.define('tag', {
    id: {
      type: STRING(32),
      defaultValue: util.uuidv1,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    description: TEXT,
    iconUrl: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });

  Tag.associate = function () {
    // 多个问题
    app.model.Tag.belongsToMany(app.model.Question,
      { as: 'questions', through: 'question_tag_relation', foreignKey: 'tag_id' });

    // 关注的用户
    app.model.Tag.belongsToMany(app.model.User,
      { as: 'followedUsers', through: 'user_follow_tag_relation', foreignKey: 'tag_id' });
  };

  return Tag;
};
