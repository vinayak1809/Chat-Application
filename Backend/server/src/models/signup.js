const Sequelize = require("sequelize");
const database = require("../../util/database");

const User = database.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  phone_number: Sequelize.STRING,
  password: { type: Sequelize.STRING, allowNull: false },
});

module.exports = User;
