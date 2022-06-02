module.exports = (sequelize, Sequelize) => {
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

  user.associate = function(models) {
    user.hasMany(models.Bookmark);
  }

  return user;
}
