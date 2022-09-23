const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app = express();

app.use(express.static(path.join(__dirname, "./Frontend")));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

////////////////////////////////////////////////////
//routes
////////////////////////////////////////////////////

const authRoutes = require("./Backend/server/routes/authRoutes");
const chatRoutes = require("./Backend/server/routes/chatRoutes");
const groupRoutes = require("./Backend/server/routes/groupRoutes");
const grouAdminRoutes = require("./Backend/server/routes/groupAdminRoutes");

app.use(authRoutes);
app.use(chatRoutes);
app.use(groupRoutes);
app.use(grouAdminRoutes);

////////////////////////////////////////////////////
//models
////////////////////////////////////////////////////

const sequelize = require("./Backend/server/util/database");

const User = require("./Backend/server/src/models/signup");
const Message = require("./Backend/server/src/models/message");
const Group = require("./Backend/server/src/models/group");
const GroupMembers = require("./Backend/server/src/models/groupMembers");
const GroupMessages = require("./Backend/server/src/models/groupMessage");

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: GroupMembers });
Group.belongsToMany(User, { through: GroupMembers });

Group.hasMany(GroupMessages);
GroupMessages.belongsTo(Group);

User.hasMany(GroupMessages);
GroupMessages.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err, "err in app.js sequelize");
  });
