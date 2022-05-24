const User = require('./user');

module.exports = (sequelize, Sequelize) => {
	const post = sequelize.define('post', {
		postNum: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		detail : {
			type: Sequelize.STRING,
			allowNull: false
		},
		date: {
			type: Sequelize.DATEONLY,
			allowNull: false
		},
		id: {
			type: Sequelize.STRING,
			allowNull: false,
      		unique: true,
      		primaryKey: true,
			references: {
				model: User,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
		});
	return post;

}
