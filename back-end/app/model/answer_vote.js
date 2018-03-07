'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE,BOOLEAN } = app.Sequelize;
  const AnswerVote = app.model.define('answer_vote', {
    id: {
      type: STRING(32),
      defaultValue: util.uuidv1,
      primaryKey: true,
    },
    value: {
      type: INTEGER,
      default: 0,
    },
    createdAt: DATE,
    updatedAt: DATE,
  }, {
      indexes: [
        {
          fields: ['answer_id'],
        }],
    });

  AnswerVote.associate = function () {
    // 属于一个回答
    app.model.AnswerVote.belongsTo(app.model.Answer, { as: 'answer', foreignKey: 'answer_id' });

    // 属于一个用户
    app.model.AnswerVote.belongsTo(app.model.User, { as: 'author', foreignKey: 'user_id' });

  };

  return AnswerVote;
};
