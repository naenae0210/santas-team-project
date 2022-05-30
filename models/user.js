module.exports = (sequelize, Sequelize) => {
  class User extends Model {

  }

  User.init({
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'user'
  })
  
  /*
  const user =  sequelize.define('user', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  */
  return user;
}
