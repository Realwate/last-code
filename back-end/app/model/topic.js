module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV1, BOOLEAN } = app.Sequelize;
  const Post = app.model.define('topics', {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey: true,
      unique: true,
    },
    title: STRING(30),
    content: STRING(255),
    creator: UUID,
    created_at: DATE,
    updated_at: DATE,
  });

    // Post.associate = function() {
    //   app.model.Post.belongsTo(app.model.User, { as: 'user' });
    // }

  return Post;
};
