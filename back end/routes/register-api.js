const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/users");
const db = require("../models/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "secret";

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/register", async (req, res, next) => {
  await db();
  const user = await req.body;
  console.log(user);
  const hashedPass = await bcrypt.hash(user.password, 10);
  user.password = hashedPass;
  const token = await jwt.sign(user, secret);
  console.log(user);
  const newUser = await new userModel({
    username: user.username,
    email: user.email,
    password: hashedPass,
    phone: +user.phone,
    token: token,
    role: user.role,
  });
  await newUser.save();
  res.header("token", token);
  res.render("users");
});

module.exports = router;
