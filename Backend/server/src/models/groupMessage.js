const Sequelize = require("sequelize");
const database = require("../../util/database");

const GroupMessages = database.define("groupMessages", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  messages: {
    type: Sequelize.STRING,
  },
});

module.exports = GroupMessages;
