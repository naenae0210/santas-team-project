const Post = require('./post');
const User = require('./user');

module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define('comment', {
    commentNum: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    commentDetail: {
      type: Sequelize.STRING,
      allowNull: false
    },

  });

  comment.associate = function (models) {
    comment.belongsTo(models.post, {
      foreignKey: "postId"
    })
  };
  return comment;
}
