const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/users");
const db = require("../models/connect")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const secret = "secret"


router.get("/", (req,res) => {
  res.render("index")
})

router.post("/register", async (req, res, next) => {
  await db();
  const user = await req.body;
  const token = await jwt.sign(user,secret)
  const hashedPass = await bcrypt.hash(user.password, 10)
  console.log(user);
  const newUser =await new userModel({
    username : user.username,
    email : user.email,
    password : hashedPass,
    phone : (+user.phone),
    token : token
  })
  await newUser.save()
  res.render("users")
});


module.exports = router;
