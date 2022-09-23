const express = require("express");
const router = express.Router();

const middleware = require("../../middleware/auth");
const chatController = require("../controllers/chat");

router.get("/chat", middleware.authenticate, chatController.getChat);
router.post("/chat", middleware.authenticate, chatController.postChat);

router.get("/user", middleware.authenticate, chatController.getUsers);
module.exports = router;
