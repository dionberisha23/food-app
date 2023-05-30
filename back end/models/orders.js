const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "name must not be empty"],
  },
  date: {
    type: String,
    required: true,
  },
  cookPhone: {
    type: Number,
  },
  driverPhone: {
    type: Number,
    required: true,
  },
  userPhone: {
    type: Number,
    required: true,
  },
  cook: {
    type: String,
  },
  driver: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const orderModel = mongoose.model("orders", schema);

module.exports = orderModel;
