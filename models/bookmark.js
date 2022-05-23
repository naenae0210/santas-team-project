const Mountain = require("./mountain");
const User = require("./user");

module.exports = (sequelize, Sequelize) => {
    class Bookmark extends Sequelize.Model {
    }
    Bookmark.Init({
      id: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
      },
      mountainNum: {
          type: Sequelize.INTEGER,
          references: {
              model: Mountain,
              key: 'number',
              deferrable: Deferrable.INITIALLY_IMMEDIATE
          }
      }
    },
    {
      sequelize,
      modelName: 'bookmark',
    });
    return Bookmark;
  }
