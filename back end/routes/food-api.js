const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/users");
const foodModel = require("../models/food");
const db = require("../models/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const secret = "secret";

router.post("/food", async (req, res) => {
  await db();
  const food = req.body;
  const token = req.body.token;

  const getUser = await userModel.findOne({ token: token });
  if (getUser != null) {
    if (getUser.role == "cook") {
      const setFood = await new foodModel({
        title: food.title,
        description: food.description,
        image: food.image,
        category: food.category,
        cook: getUser.username,
        phone: getUser.phone,
      });
      await setFood.save();
      res.status(200).send("food added successfully");
    } else {
      res.status(403).send("only cooks can add food");
    }
  } else {
    res.status(404).send("user does not exist");
  }
});

/**
 * @swagger
 *   /food:
 *     post:
 *       summary: add food
 *       description: complete the form about adding the food,and add the food into the database
 *       parameters:
 *         - name: title
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: description
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: image
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: category
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: token
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *
 *
 *       responses:
 *         200:
 *           description: food added successfully
 *         403:
 *           description: User role is not a cook
 *         404:
 *           description: user does not exist in the database
 *
 */

router.delete("/food", async (req, res) => {
  await db();
  const token = req.body.token;
  const food = req.body.title;

  const verifyUser = await userModel.findOne({ token: token });
  if (verifyUser != null) {
    const getFood = await foodModel.findOne({ title: food });
    if (getFood != null) {
      if (verifyUser.username == getFood.cook) {
        await foodModel.deleteOne({ title: food });
        res.status(200).send("food deleted successfully");
      } else {
        res
          .status(403)
          .send("u do not have the privileges to remove this food");
      }
    } else {
      res.status(405).send("food does not exist");
    }
  } else {
    res.status(404).send("user token not valid");
  }
});

/**
 * @swagger
 *   /food:
 *     delete:
 *       summary: delete specified food
 *       description: get the token from localstorage and delete the food
 *       parameters:
 *         - name: title
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: token
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *
 *
 *       responses:
 *         200:
 *           description: food removed successfully
 *         403:
 *           description: not the user that posted the food
 *         404:
 *           description: the token is invalid
 *         405:
 *           description: the food title does not exist
 *
 */

router.post("/get-food-cook", async (req, res) => {
  await db();
  const token = req.body.token;
  const getUser = await userModel.findOne({ token: token });
  if (getUser != null) {
    const getFood = await foodModel.find({ cook: getUser.username });
    if (getFood != null) {
      res.status(200).send({
        message: "food displayed successfully",
        getFood,
      });
    } else {
      res.status(405).send("no food posted yet");
    }
  } else {
    res.status(404).send("token is invalid");
  }
});

/**
 * @swagger
 *   /get-food-cook:
 *     post:
 *       summary: get all food posted by cook
 *       description: get the token from localstorage that identifies the cook and get all the food that the cook has posted
 *       parameters:
 *         - name: token
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *
 *
 *       responses:
 *         200:
 *           description: food displayed successfully
 *         404:
 *           description: the token is invalid
 *         405:
 *           description: u have not posted any food yet
 *
 */

router.get("/get-all-food", async (req, res) => {
  await db();
  const getFood = await foodModel.find();
  if (getFood != null) {
    res.status(200).send(getFood);
  } else {
    res.status(405).send("no food to show");
  }
});

/**
 * @swagger
 *   /get-all-food:
 *     get:
 *       summary: get all food posted by everyone
 *       description: gets all food that exists in the database
 *
 *       responses:
 *         200:
 *           description: food displayed successfully
 *         405:
 *           description: no food available
 *
 */

module.exports = router;
