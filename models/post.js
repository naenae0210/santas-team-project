const User = require('./user');

module.exports = (sequelize, Sequelize) => {
        const User = require('./user')(sequelize, Sequelize);
        class Post extends Sequelize.Model {
                static async findByPkAndUpdate(id, params) {
                        try {
                                let post = await Post.findByPk(id);
                                if (post) {
                                        post = await Post.update(params, {
                                                where: {
                                                        id:id
                                                }
                                        });
                                }
                                return post;
                        } catch (err) {
                                console.log(err);
                        }
                }
                static async findByPkAndRemove(id) {
                        try {
                                let post = await Post.findByPk(id);
                                if (post) {
                                        post = await Post.destroy({
                                                where: {
                                                        id:id
                                                }
                                        });
                                }
                                return post;
                        } catch (err) {
                                console.log(err);
                        }
                }
			};

			Post.init({
					postNum: { //postNum
							type: Sequelize.INTEGER,
							allowNull: false,
							autoIncrement: true,
							primaryKey: true
					},
					title: {
							type: Sequelize.STRING,
							allowNull: false
					},
					detail: {
							type: Sequelize.STRING,
							allowNull: false
					},
					/*
					userId: {
							type: Sequelize.STRING,
							allowNull: false,
							unique: true,
							references: {
									model: 'users',
									key: 'id',
									deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
							}
					}*/
			}, {
					sequelize,
					modelName: 'post'
				});

				return Post;
		};
