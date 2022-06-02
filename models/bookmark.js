const Mountain = require("./mountain");
const User = require("./user");

module.exports = (sequelize, Sequelize) => {
    const bookmark = sequelize.define('bookmark', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      mountainNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'mountains',
            key: 'number',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    });
    
    return bookmark;
  }
