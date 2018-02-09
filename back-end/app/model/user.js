'use strict';

const util = require('../util');

module.exports = app => {

  const { STRING, INTEGER, DATE, UUID, UUIDV1, BOOLEAN } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: UUID,
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
    password: STRING(32),
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'name' ],
      }],
  });

  // User.prototype.associate = function() {
  //   app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
  // };

  return User;
};
