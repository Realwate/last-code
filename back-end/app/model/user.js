'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: STRING(32),
      defaultValue: util.uuidv1,
      primaryKey: true,
      unique: true,
    },
    role: {
      type: INTEGER,
      default: 0,
    },
    name: {
      type: STRING(32),
      allowNull: false,
      unique: true,
    },
    password:  {
      type: STRING(32),
      allowNull: false,
    },
    description:  {
      type: STRING,
    },
    avatarUrl:  {
      type: STRING,
    },
    company:  {
      type: STRING,
    },
    site:  {
      type: STRING,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'name' ],
      }],
  });

  User.associate = function () {
    // 我提出的问题
    app.model.User.hasMany(app.model.Question, { as: 'question', foreignKey: 'user_id' });
    // 我的回答
    app.model.User.hasMany(app.model.Answer, { as: 'answer', foreignKey: 'user_id' });

    // 我的投票
    app.model.User.hasMany(app.model.AnswerVote, { as: 'answerVote', foreignKey: 'user_id' });
    app.model.User.hasMany(app.model.QuestionVote, { as: 'questionVote', foreignKey: 'user_id' });


    // 关注我的人
    app.model.User.belongsToMany(app.model.User,
       {  as: 'follower', through: 'user_follow_user_relation', foreignKey: 'following_id'});
    // 我关注的人
    app.model.User.belongsToMany(app.model.User,
      {  as: 'following', through: 'user_follow_user_relation', foreignKey: 'follower_id'});

    // 我关注的问题
    app.model.User.belongsToMany(app.model.Question,
      { as: 'followingQuestion', through: 'user_follow_question_relation', foreignKey: 'user_id' });
    // 我关注的标签
    app.model.User.belongsToMany(app.model.Tag,
      { as: 'followingTag', through: 'user_follow_tag_relation', foreignKey: 'user_id' });

    };

  return User;
};
