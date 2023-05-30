const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/TeDera";

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connected successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connect;
