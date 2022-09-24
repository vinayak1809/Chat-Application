const express = require("express");
const User = require("../src/models/signup");
const Message = require("../src/models/message");
const { Op } = require("sequelize");

exports.getUsers = async (req, res, next) => {
  User.findAll({
    where: {
      id: {
        [Op.ne]: req.id,
      },
    },
  }).then((users) => {
    res.status(200).json({
      success: true,
      users: users,
      message: "users send successfully",
    });
  });
};

exports.getChat = async (req, res, next) => {
  const receiverId = req.body.rec_id;
  console.log(req.id, receiverId);
  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        { userId: req.id, receiver: receiverId },
        { userId: receiverId, receiver: req.id },
      ],
    },
  });

  res.status(200).json({
    success: true,
    chat: messages,
    message: "chat send successfully",
  });

  //const lastMsg = +req.query.lastMsg;
  //await Message.findAll({ where: { id: { [Op.gt]: lastMsg } } })
  //  .then((messages) => {
  //    res.status(200).json({
  //      success: true,
  //      chat: messages,
  //      message: "chat send successfully",
  //    });
  //  })
  //  .catch((err) => {
  //    res
  //      .status(403)
  //      .json({ success: true, error: err, message: "something went wrong" });
  //  });
};

exports.postChat = async (req, res, next) => {
  const id = req.id;
  const msg = req.body.message;
  const receiverId = req.body.receiverId;

  const user = await User.findByPk(id).then((user) => {
    return user.name;
  });

  await Message.create({
    username: user,
    message: msg,
    userId: id,
    receiver: receiverId,
  }).then((result) => {
    return res
      .status(201)
      .json({ result: result, success: true, message: "added message" });
  });
};
