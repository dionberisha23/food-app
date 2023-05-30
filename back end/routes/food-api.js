const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const foodModel = require("../models/food");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const secret = "secret";

router.post("/add-food", async (req, res) => {
  const food = req.body;
  const token = food.token;
  const { title, description, image, category, cook, phone } = food;
  const getUser = userModel.findOne(token);

  if (getUser == undefined || null) {
    res.send("failed to authenticate user");
  }
  const newFood = new foodModel({
    title,
    description,
    image,
    category,
    cook,
    phone,
  });
  await newFood.save();
  res.send("food added succesfully");
});

router.post("/get-food-category", async (req, res) => {
  const category = req.body.category;
  const foodList = await foodModel.find(category, (err, valid) => {
    if (err) {
      res.send("no products were found in the selected category");
    }
  });

  res.send(foodList);
});

router.post("/get-food", async (req, res) => {
  const foodList = await foodModel.find();
  res.send(foodList);
});

router.post("/update-food", async (req, res) => {
  const food = req.body;
  const token = food.token;
  const getFood = foodModel.findOne(food.title, (err, valid) => {
    if (err) {
      res.send("couldnt find the food specified");
    }
  });
  const getUser = userModel.find(token, (err, val) => {
    if (err) {
      res.send("token authentication failed");
    }
  });
  if (getUser.username == getFood.cook) {
  }
});

module.exports = router;
