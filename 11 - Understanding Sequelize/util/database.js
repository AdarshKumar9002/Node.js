const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "a1K11@1i9,", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
