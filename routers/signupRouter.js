const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.render("signUp");
});

router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  try {
    await User.create({
      name: req.body.name,
      password: hashedPassword,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  // res.status(201).json({ message: "User created" });
  res.redirect("/profile");
});

module.exports = router;
