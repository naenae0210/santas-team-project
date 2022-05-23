module.exports = (sequelize, Sequelize) => {
  class Comment extends Sequelize.Model {
  }
  Comment.Init({
    commentNum: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    postNum: {
      type: Sequlize.INTEGER,
      references: {
	      model: Post,
	      key: postNum,
	      deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
   commentDetail : {
      type: Sequelize.STRING,
      allowNull: false
    },
    commentDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    id: {
      type: Sequelize.STRING,
      references: {
          model: User,
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
     }
    }
  },
  {
    sequelize,
    modelName: 'comment',
  });
  return Comment;
}
