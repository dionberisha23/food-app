const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../models/connect");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const token = jwt.decode(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
);
console.log(token);
db();
let user = {};
router.post("/register", async (req, res, next) => {
  user = req.body;
  tempEmail = user.email;

  encryptedPassword = await bcrypt.hash(user.password, 10);
  var UserDetails = new User({
    username: user.username,
    email: user.email,
    password: encryptedPassword,
    phone: +user.phone,
  });
  const oldUser = await User.findOne({});
  if (oldUser) {
    console.log("user already exists");
  } else {
    UserDetails.save();
  }
});

module.exports = {
  router,
  user,
};
