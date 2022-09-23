const express = require("express");
const router = express.Router();

const middleware = require("../../middleware/auth").authenticate;
const groupAdminController = require("../controllers/groupAdmin");

////////////////////// group admin routes ///////////////////

router.post(
  "/get-grp-members",
  middleware,
  groupAdminController.getGroupsMembers
);
router.post("/change-admin", middleware, groupAdminController.changeAdmin);

router.post(
  "/remove-from-group",
  middleware,
  groupAdminController.removeFromGroup
);
module.exports = router;
