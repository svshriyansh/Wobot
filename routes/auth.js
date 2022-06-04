require("dotenv").config();
const blacklisttoken = require("../models/Token");
const authenticationToken = require("../middleware/auth");
const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/User");

routes.get("/users", authenticationToken, async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.send("Error", err);
  }
});

routes.get("/user", authenticationToken, async (req, res) => {
  let user = await User.findOne({ username: req.user.username }).select(
    "-password"
  );
  res.send(user);
});
routes.get("/:username", authenticationToken, async (req, res) => {
  try {
    const data = await user.findOne({ username: req.params.username });
    let userdetail = {};
    if (data) {
      userdetail.firstname = data.firstname;
      userdetail.lastname = data.lastname;
    }
    res.json(userdetail);
  } catch (error) {
    res.send(error);
  }
});

routes.post("/signUP", async (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let username = req.body.username;
  let password = req.body.password;

  try {
    let user = await User.findOne({ username: username });
    if (user) {
      res.send("User already exist");
    }
    user = await User.findOne({ username: username });
    if (user) {
      res.send("username already exist");
    }
    user = new User({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
    });
    user = await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
});

routes.post("/signIn", async (req, res) => {
  let username = req.body.username;
  let user = await User.findOne({ username: username });
  if (!user) {
    return res.send("No user registered");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user = { username: username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    }
  } catch (err) {
    console.log(err);
    res.send("Wrong Password");
  }
});

module.exports = routes;
