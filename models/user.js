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
//const passportLocalSequelize = require('passport-local-sequelize');
const bcrypt = require("bcrypt");


module.exports = (sequelize, Sequelize) => {
  //const Post = require("./post")(sequelize, Sequelize);
  class User extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      let user = await User.findByPk(id);
        if (user) {
          user = await User.update(params, {
            where: {
              id: id
            }
          });
        }
        return user;
      
      }/*
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
    }*/
    static async findByPkAndRemove(id) {
      let user = await User.findByPk(id);
        if (user) {
          user = await User.destroy({
            where: {
              id: id
            }
          });
        }
        return user;
      }
      /*
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
    }*/
    passwordComparison = (inputPassword) => {
      let user = this;
      return bcrypt.compare(inputPassword, user.password);
    };

  };

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
    hooks: {
      beforeSave: async (user) => {
        let hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      }
    },
    sequelize,
    modelName: 'user'
  });
 /*
  passportLocalSequelize.attachToUser(User, {
    usernameField: 'id',
    hashField: 'password',
    saltField: 'mysalt'
  });*/

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
