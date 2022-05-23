
module.exports = (sequelize, Sequelize) => {
  class Around extends Sequelize.Model {
  }
  Comment.Init({
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: Sequlize.INTEGER,
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
