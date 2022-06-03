const post = require("./post");

const Around = require("../models/index").Around;

module.exports = (sequelize, Sequelize) => {
    const mountain = sequelize.define('mountain', {
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      altitude: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      distance: {
        type: Sequelize.INTEGER,
      },
      difficulty: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cableCar: {
        type: Sequelize.BOOLEAN
      },
      landscape: {
        type: Sequelize.BLOB
      }
    });

    mountain.associate = function(models) {
      mountain.hasMany(models.Around, {
        foreignKey: "mountainNum",
        sourceKey: "number"
      }),
      mountain.hasMany(models.Bookmark, {
        foreignKey: "mountainNum",
        sourceKey: "number"
      });
    }
    return mountain;
  }
