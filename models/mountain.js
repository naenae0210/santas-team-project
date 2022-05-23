module.exports = (sequelize, Sequelize) => {
    class Mountain extends Sequelize.Model {
    }
    Mountain.Init({
      number: {
        type: Sequelize.INTEEGER,
        allowNull: false,
        autoIncrement: true,
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

    },
    {
      sequelize,
      modelName: 'mountain',
    });
    return Mountain;
  };