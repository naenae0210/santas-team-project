'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    postNum: DataTypes.INTEGER,
    title: DataTypes.STRING,
    detail: DataTypes.STRING,
    date: DataTypes.DATE,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};