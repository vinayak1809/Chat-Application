const express = require("express");
const router = express.Router();

const middleware = require("../../middleware/auth").authenticate;
const groupController = require("../controllers/group");

router.get("/get-groups", middleware, groupController.getGroupsOnMainPage);
router.post("/add-group-member", middleware, groupController.makeAGroup);

router.post("/get-grp-msg", middleware, groupController.getGroupMessages); //post is used because group id is sended via routes
router.post("/post-grp-msg", middleware, groupController.postGrouppMessages);

module.exports = router;
