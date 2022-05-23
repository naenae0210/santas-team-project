'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('arounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      mountainNum: {
        type: Sequelize.INTEGER
      },
      aroundName: {
        type: Sequelize.STRING
      },
      kind: {
        type: Sequelize.STRING
      },
      scroe: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('arounds');
  }
};