'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE, UUID, TEXT, BOOLEAN } = app.Sequelize;
  const Comment = app.model.define('comment', {
    id: {
      type: UUID,
      defaultValue: util.uuidv1,
      primaryKey: true,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
  }, {
    indexes: [
      {
        fields: [ 'answer_id' ],
      }],
  });

  Comment.associate = function () {
    // 属于一个回答
    app.model.Comment.belongsTo(app.model.Answer, { as: 'answer', foreignKey: 'answer_id' });

    // 属于一个用户
    app.model.Comment.belongsTo(app.model.User, { as: 'author', foreignKey: 'user_id' });

   };

  return Comment;
};
