const express = require("express");
const User = require("../src/models/signup");

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
