const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user.js")(sequelize, Sequelize);
db.Mountain = require("./mountain.js")(sequelize, Sequelize);
db.Post = require("./post.js")(sequelize, Sequelize);
db.Around = require("./around.js")(sequelize, Sequelize);
db.Comment = require("./comment.js")(sequelize, Sequelize);
db.Bookmark = require("./bookmark.js")(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});

module.exports = db;