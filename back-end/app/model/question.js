'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Question = app.model.define('question', {
    id: {
      type: STRING(32),
      defaultValue: util.uuidv1,
      primaryKey: true,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    content: TEXT,
    views: {
      type: INTEGER,
      defaultValue: 0
    },
    voteCount: { // 冗余存储
      type: INTEGER,
      defaultValue: 0
    },
    followerCount: {
      type: INTEGER,
      defaultValue: 0
    },
    answerCount: {
      type: INTEGER,
      defaultValue: 0
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
    {
      indexes: [
        {
          fields: ['user_id'],
        }]
    });

  Question.associate = function () {
    // 一个作者
    app.model.Question.belongsTo(app.model.User, { as: 'creator', foreignKey: 'user_id' });

    // 一个问题多个答案
    app.model.Question.hasMany(app.model.Answer, { as: 'answers', foreignKey: 'question_id' });
    // 多个投票
    app.model.Question.hasMany(app.model.QuestionVote, { as: 'questionVote', foreignKey: 'question_id' });

    // 关注问题的user
    app.model.Question.belongsToMany(app.model.User,
      { as: 'follower', through: 'user_follow_question_relation', foreignKey: 'question_id' });
    // 问题的标签
    app.model.Question.belongsToMany(app.model.Tag,
      { as: 'tags', through: 'question_tag_relation', foreignKey: 'question_id' });

  };

  Question.beforeFind((options) => {
    // options.attributes = options.attributes || {};
    // options.attributes.exclude = ['created_at'];
  })

  return Question;
};
