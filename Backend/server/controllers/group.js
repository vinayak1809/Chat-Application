const express = require("express");
const User = require("../src/models/signup");
const Group = require("../src/models/group");
const GroupMember = require("../src/models/groupMembers");
const GroupMessages = require("../src/models/groupMessage");
const { Op, where } = require("sequelize");

///////////////////////////////////////////
// get group infomartion
///////////////////////////////////////////

exports.getGroupsOnMainPage = async (req, res, next) => {
  try {
    const grp_id_list = await GroupMember.findAll({
      where: { userId: req.id },
    });

    const result = [];
    grp_id_list.forEach((element) => {
      result.push(element.groupId);
    });

    await Group.findAll({ where: { id: result } }).then((result) => {
      res.status(200).json({ success: true, group_info: result });
    });
  } catch (err) {
    console.log(err, "in getGroupsOnMainPage ");
  }
};

///////////////////////////////////////////
/// get group messages
///////////////////////////////////////////

exports.getGroupMessages = async (req, res, next) => {
  try {
    const group_id = req.body.group_id;

    var group_admin = await Group.findOne({ where: { id: group_id } });
    var group_admin = await User.findOne({ where: { id: group_admin.admin } });

    let authTochgAdmin = false;
    if (group_admin.id == req.id) {
      authTochgAdmin = true;
    }

    const grp_msgs = await GroupMessages.findAll({
      where: { groupId: group_id },
    });

    res.status(200).json({
      success: true,
      groupMsg: grp_msgs,
      group_admin: group_admin.name,
      authTochgAdmin: authTochgAdmin,
      message: "msgs sent successfully",
    });
  } catch (err) {
    console.log(err, " in getGroupMessages");
  }
};

///////////////////////////////////////////
// add a message in group
///////////////////////////////////////////

exports.postGrouppMessages = async (req, res, next) => {
  try {
    const message = req.body.message;
    const group_id = req.body.groupid;

    const addMsg = await GroupMessages.create({
      groupId: group_id,
      userId: req.id,
      messages: message,
    }).then(() => {
      res
        .status(201)
        .json({ success: true, message: "message added to the group" });
    });
  } catch (err) {
    console.log(err, " in postGrouppMessages");
  }
};

///////////////////////////////////////////
// make a group and add group member
///////////////////////////////////////////

exports.makeAGroup = async (req, res, next) => {
  const group_name = req.body.name;
  const group_members = req.body.users_ids;
  try {
    const createGroup = await Group.create({
      admin: req.id,
      groupName: group_name,
    });

    {
      var members = [{ userId: req.id, groupId: createGroup.id }];
      for (let i = 0; i < group_members.length; i++) {
        var obj = {
          userId: group_members[i],
          groupId: createGroup.id,
        };
        members.push(obj);
      }
    }
    GroupMember.bulkCreate(members, { returning: true }).then((result) => {
      res
        .status(201)
        .json({ success: true, message: `${createGroup.name}group created` });
    });
  } catch (err) {
    console.log(err, " in makeAGroup");
  }
};
