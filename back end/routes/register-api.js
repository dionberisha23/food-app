const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/users");
const db = require("../models/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const secret = "secret";

router.post("/register", async (req, res, next) => {
  await db();
  const user = await req.body;
  const username = user.username;

  const hashedPass = await bcrypt.hash(user.password, 10);
  user.password = hashedPass;

  const token = await jwt.sign(user, secret);

  const getExistingUser = await userModel.exists({
    username: username,
  });
  if (getExistingUser != null) {
    res.status(409).send("user already exists");
  } else {
    const newUser = await new userModel({
      username: user.username,
      email: user.email,
      password: hashedPass,
      phone: +user.phone,
      token: token,
      role: user.role,
    });

    await newUser.save();
    res.status(200).send({
      message: "user created",
      token: token,
    });
  }
});

/**
 * @swagger
 *   /register:
 *     post:
 *       summary: Registers a User
 *       description: complete the form about registration and register a user into the mongodb database
 *       parameters:
 *         - name: username
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: email
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: password
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *         - name: phone
 *           in: formData
 *           required: true
 *           schema:
 *             type: Number
 *         - name: role
 *           in: formData
 *           required: true
 *           schema:
 *             type: String
 *
 *
 *       responses:
 *         200:
 *           description: User Created Successfully
 *         409:
 *           description:User exists in the database
 *
 */

module.exports = router;
