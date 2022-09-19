const express = require("express");
const User = require("../src/models/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

///////////////////////////////////////////////
// signup
///////////////////////////////////////////////

exports.postSignup = (req, res, next) => {
  const { name, email, phone_number, password } = req.body;
  if (name.length == 0 || email.length == 0 || phone_number.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "please fill the form corectly" });
  } else if (password.length <= 7) {
    return res
      .status(400)
      .json({ success: false, message: "password should be of 8 characters" });
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (!err) {
        User.create({
          name: name,
          email: email,
          phone_number: phone_number,
          password: hash,
        })
          .then(() => {
            res
              .status(200)
              .json({ success: true, message: "successfully created account" });
          })
          .catch((err) => {
            return res.status(400).json({
              success: false,
              message: "already user exist",
              error: err,
            });
          });
      } else {
        res.json({ message: "password hassing prb" });
      }
    });
  });
};

///////////////////////////////////////////////
// login
///////////////////////////////////////////////

function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "24h" });
}

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findAll({ where: { email: email } })
    .then((user) => {
      if (user.length != 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (!err) {
            const token = generateAccessToken({ id: user[0].id });
            return res.status(200).json({
              token: token,
              success: true,
              message: "successfully login",
            });
          } else if (err) {
            return res.status(402).json("something went wrong");
          } else {
            return res.status(401).json({
              success: false,
              message: "invalid password",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "something went wrong while searching for the user",
        error: err,
      });
    });
};
