const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = require("../models/users");

const url =
  "mongodb+srv://dionberisha23:vb8I5LSbeipqibHh@cluster0.wa22vs8.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connected successfully");
  } catch (err) {
    console.log(err);
  }
}

router.post("/register", (req, res, next) => {
  const user = req.body;
  console.log(user);
});

connect();

module.exports = router;
