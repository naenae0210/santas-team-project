/*
 * module.exports = (sequelize, Sequelize) => {
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
    user.hasMany(models.Bookmark, {
      foreignKey: "id",
      sourceKey: "id"
    });
  }

  return user;
}*/
const passportLocalSequelize = require('passport-local-sequelize');


module.exports = (sequelize, Sequelize) => {
  //const Post = require("./post")(sequelize, Sequelize);
  class User extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let user = await User.findByPk(id);
        if (user) {
          user = await User.update(params, {
            where: {
              id: id
            }
          });
        }
        return user;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let user = await User.findByPk(id);
        if (user) {
          user = await User.destroy({
            where: {
              id: id
            }
          });
        }
        return user;
      }catch (err) {
        console.log(err);
     }
    }

  };

  User.init({
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING(1024),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth: {
      type: Sequelize.DATEONLY,
    },
    nickname: {
      type: Sequelize.STRING,
    },
    myhash: {
      type: Sequelize.STRING
    },
    mysalt: {
      type: Sequelize.STRING
    }
  }, {
    sequelize,
    modelName: 'user'
  });
 
  passportLocalSequelize.attachToUser(User, {
    usernameField: 'id',
    hashField: 'password',
    saltField: 'mysalt'
  });
  
  User.plugin(passportLocalSequelize);

  User.associate = function(models) {
    User.hasMany(models.Bookmark, {
      foreignKey: "id",
      sourceKey: "id"
    });
    User.hasMany(models.post, {
      foreignKey: "userId",
      sourceKey: "id"
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      sourceKey: "id"
    });
  }

  return User;
};
