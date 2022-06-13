module.exports = (sequelize, Sequelize) => {
	
	class Comment extends Sequelize.Model {

		static async findByPkAndUpdate(id, params) {
			try {
				let comment = await Comment.findByPk(id);
				if (comment) {
					comment = await Comment.update(params, {
						where: {
							id: id
						}
					});
				}
				return comment;
			} catch (err) {
				console.log(err);
			}
		}
		static async findByPkAndRemove(id) {
			try {
				let comment = await Comment.findByPk(id);
				if (comment) {
					comment = await Comment.destroy({
						where: {
							id: id
						}
					});
				}
				return comment;
			} catch (err) {
				console.log(err);
			}
		}
	};

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
    });
    comment.belongsTo(models.User, {
			foreignKey: "userId",
		})
  };
  return comment;
}
