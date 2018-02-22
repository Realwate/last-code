'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE,  BOOLEAN } = app.Sequelize;
  const QuestionVote = app.model.define('question_vote', {
    id: {
      type: STRING(32),
      defaultValue: util.uuidv1,
      primaryKey: true,
    },
    value: {
      type: INTEGER,
      default: 0,
    },
    // user_id: {
    //   type: STRING(32),
    //   references: {
    //     model: app.model.User,
    //     key: 'id',
    //   }
    // }
  }, {
    indexes: [
      {
        fields: [ 'question_id' ],
      }],
  });
  QuestionVote.prototype.associate = function () {
    // 属于一个问题
    app.model.QuestionVote.belongsTo(app.model.Question, { as: 'question', foreignKey: 'question_id' });

    // 属于一个用户
    app.model.QuestionVote.belongsTo(app.model.User, { as: 'author', foreignKey: 'user_id' });

   };

  return QuestionVote;
};
