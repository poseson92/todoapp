const Sequelize = require("sequelize");
const User = require("./users");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = User;
User.init(sequelize);

User.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
