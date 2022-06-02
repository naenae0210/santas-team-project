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

db.Around.belongsTo(db.Mountain, { foreignKey: "mountainNum", targetKey: 'number'});
db.Mountain.hasMany(db.Around);

db.Mountain.hasMany(db.Bookmark);
db.User.hasMany(db.Bookmark);
db.Bookmark.belongsTo(db.User, {foreignKey: "id", targetKey: "id"});
db.Bookmark.belongsTo(db.Mountain, {foreignKey: "mountainNum", targetKey: "number"});

module.exports = db;
