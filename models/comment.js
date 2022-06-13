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
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
  }

  });

  comment.associate = function (models) {
    comment.belongsTo(models.post, {
      foreignKey: "postId",
      sourceKey: "id"
    })
    comment.belongsTo(models.User, {
			foreignKey: "userId",
			targetKey: "id"
		})
  };
  return comment;
}
