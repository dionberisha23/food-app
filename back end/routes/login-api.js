const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/users");
const db = require("../models/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "secret";

router.get("/login", (req, res) => {
  res.render("users");
});

router.post("/login", async (req, res, next) => {
  await db();
  const user = req.body;
  const email = user.email;
  const getUser = await userModel.findOne({ email });

  bcrypt.compare(user.password, getUser.password, (err, valid) => {
    if (valid) {
      jwt.verify(getUser.token, secret);

      res.render("setfood", {
        getUser,
      });
    } else {
      res.send("email or password is incorrect");
    }
  });
});

router.post("/update", async (req, res, next) => {
  await db();
  const user = req.body;
  const email = user.email;
  const newpassword = await bcrypt.hash(user.newpassword, 10);

  const updatepassword = await {
    password: newpassword,
  };

  const getUser = await userModel.findOne({ email });

  if (
    bcrypt.compare(user.oldpassword, getUser.password) &&
    jwt.verify(getUser.token, secret)
  ) {
    await userModel.updateOne({ email }, updatepassword);
    res.render("users", {});
  } else {
    res.send("old password is not correct");
  }
});

module.exports = router;
