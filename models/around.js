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
      primaryKey: true,
      references: {
          model: 'mountains',
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

  around.associate = function(models){
    around.belongsTo(models.Mountain, {
      foreignKey: "mountainNum",
      targetKey: "number"
    })
  };

  return around;
}
