'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	 try {
		  await queryInterface.addColumn(
			  'posts',
			'id',
			  {
				  type: Sequelize.DataTypes.INTEGER,
				  allowNull: false,
				  autoIncrement: true,
				  primaryKey: true
			  }
		  );
	  } catch (err) {
		  throw err;
	  }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
		//await queryInterface.removeColumn('posts', 'postNum');
	 }
};
