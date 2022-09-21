const Sequelize = require("sequelize");
const database = require("../../util/database");

const GroupMembers = database.define("groupMembers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = GroupMembers;
