const express = require("express");
const User = require("../src/models/signup");
const Group = require("../src/models/group");
const GroupMember = require("../src/models/groupMembers");
const GroupMessages = require("../src/models/groupMessage");
const { Op, where } = require("sequelize");

///////////////////////////////////////////
// get group members to change admin
///////////////////////////////////////////

exports.getGroupsMembers = async (req, res, next) => {
  const group_id = req.body.group_id;
  try {
    const find_grp_admin = await Group.findOne({ where: { id: group_id } });

    const grp_id_list = await GroupMember.findAll({
      attributes: ["userId"],
      where: {
        groupId: group_id,
        userId: {
          [Op.ne]: find_grp_admin.admin,
        },
      },
    });

    const id = [];
    grp_id_list.forEach((user_id) => {
      id.push(user_id.userId);
    });

    const load_user = await User.findAll({ where: { id: id } });

    res.status(200).json({ success: true, load_user: load_user });
  } catch (err) {
    console.log(err, "in getGroupsOnMainPage ");
  }
};

///////////////////////////////////////////
// change admin of group
///////////////////////////////////////////

exports.changeAdmin = async (req, res, next) => {
  const userid = req.body.user_id;
  const groupid = req.body.grp_id;

  const changeTheAdmin = await Group.update(
    { admin: userid },
    { where: { id: groupid } }
  ).then(() => {
    res.status(20).json({ success: true, message: "updated group name" });
  });
};

///////////////////////////////////////////
// remove user from group
///////////////////////////////////////////

exports.removeFromGroup = async (req, res, next) => {
  const userId = req.body.usedid;
  const groupId = req.body.groupid;

  console.log(userId, groupId);
  const removeUser = await Group.update(
    { admin: userId },
    { where: { id: groupId } }
  );

  removeUser.then(() => {
    res.status(204).json({ success: true, message: "user removed" });
  });
};
