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
    // It is possible to create foreign keys:
    // question_id: {
    //   type: STRING(32),
    //   references: {
    //     model: app.model.Question,
    //     key: 'id',
    //   }
    // }
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
    app.model.Answer.hasMany(app.model.Comment, { as: 'comment', foreignKey: 'answer_id' });

  };

  return Answer;
};