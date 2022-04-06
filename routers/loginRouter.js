const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("../models/userModel");
const secret = "1rtyf6OZjepB63xRwyNSkk0czzttHKjXNQk000qzp";
router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  console.log(name, password, req.body);

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid name or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid name or password",
      });
    }

    const token = jwt.sign({ id: user._id }, secret);
    res.cookie("jwt", token, { httpOnly: true, secure: false });
  } catch (err) {
    console.log("err:", err);
    return res.status(400).json({
      success: false,
      message: "Invalid name or password",
    });
  }
  res.redirect("/homepage");
});

module.exports = router;
