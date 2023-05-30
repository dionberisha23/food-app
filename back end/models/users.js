const db = require("./connect");
const mongoose = require("mongoose");
const getUser = require("../routes/register-api");
const bcrypt = require("bcryptjs");

db();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "admin",
  },
  token: {
    type: String,
    required: false,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
