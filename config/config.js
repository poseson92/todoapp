require("dotenv").config();

module.exports = {
  development: {
    username: "admin",
    password: process.env.MYSQL_PASSWORD,
    database: "todolist",
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
  test: {
    username: "admin",
    password: process.env.MYSQL_PASSWORD,
    database: "todolist_test",
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
  production: {
    username: "admin",
    password: process.env.MYSQL_PASSWORD,
    database: "todolist_production",
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
};
