const Mountain = require('./mountain');

module.exports = (sequelize, Sequelize) => {
  const around = sequelize.define('around', {
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    mountainNum: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      references: {
	      model: Mountain,
	      key: 'number',
	      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
   name : {
      type: Sequelize.STRING,
      allowNull: false
    },
    score: {
      type: Sequelize.INTEGER
    }
  });
  return around;
}
