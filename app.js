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

app.use(authRoutes);
app.use(chatRoutes);

////////////////////////////////////////////////////
//models
////////////////////////////////////////////////////

const sequelize = require("./Backend/server/util/database");

const User = require("./Backend/server/src/models/signup");
const Message = require("./Backend/server/src/models/message");

User.hasMany(Message);
Message.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err, "err in app.js sequelize");
  });
