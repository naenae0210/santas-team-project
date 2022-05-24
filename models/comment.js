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
    postNum: {
      type: Sequelize.INTEGER,
      references: {
	      model: 'posts',
	      key: 'postNum',
	      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
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
      allowNull: false,
      unique: true,
      references: {
          model: 'users',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
     }
    }
  });
  return comment;
}
