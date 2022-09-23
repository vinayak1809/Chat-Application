const Sequelize = require("sequelize");
const database = require("../../util/database");

const Group = database.define("group", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  admin: {
    type: Sequelize.INTEGER,
  },
  groupName: {
    type: Sequelize.STRING,
  },
});

module.exports = Group;
