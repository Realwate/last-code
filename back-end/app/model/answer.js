'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE, TEXT ,BOOLEAN} = app.Sequelize;
  const Answer = app.model.define('answer', {
    id: {
      type: STRING(32),
      defaultValue: util.uuidv1,
      primaryKey: true,
    },
    accept: {
      type: BOOLEAN,
      defaultValue: false,
    },
    content: TEXT,
    voteCount: { // 冗余存储
      type: INTEGER,
      defaultValue: 0
    },
    commentCount: {
      type: INTEGER,
      defaultValue: 0
    },
    createdAt: DATE,
    updatedAt: DATE,
  }, {
      indexes: [
        {
          fields: ['question_id'],
        }],
    });

  Answer.associate = function () {
    // 属于一个问题
    app.model.Answer.belongsTo(app.model.Question, { as: 'question', foreignKey: 'question_id' });
    // 属于一个作者
    app.model.Answer.belongsTo(app.model.User, { as: 'author', foreignKey: 'user_id' });

    // 多个投票
    app.model.Answer.hasMany(app.model.AnswerVote, { as: 'answerVote', foreignKey: 'answer_id' });
    // 多条评论
    app.model.Answer.hasMany(app.model.Comment, { as: 'comments', foreignKey: 'answer_id' });

  };

  return Answer;
};
