const Mountain = require('./mountain');

module.exports = (sequelize, Sequelize) => {
  class Around extends Sequelize.Model {
  }
  Around.Init({
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: Sequelize.INTEGER,
      references: {
	      model: Mountain,
	      key: number,
	      deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
   name : {
      type: Sequelize.STRING,
      allowNull: false
    },
    score: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'around',
  });
  return Around;
}
