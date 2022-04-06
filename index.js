const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const secret = "1rtyf6OZjepB63xRwyNSkk0czzttHKjXNQk000qzp";
const app = express();
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());

//CONNECT TO DB
mongoose
  .connect(
    "mongodb+srv://chariotte:DMDmw0jaSSJOqRaB@cluster0.kuvm7.mongodb.net/bonPlan?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });
//body du form login
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

// Routes
app.get("/users", (req, res) => {
  res.render("users");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/homepage", (req, res) => {
  res.render("homepage");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signUp", (req, res) => {
  res.render("signUp");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/paris", (req, res) => {
  res.render("paris");
});

app.get("/lyon", (req, res) => {
  res.render("lyon");
});

app.get("/marseille", (req, res) => {
  res.render("marseille");
});

app.listen(8001, () => console.log("listening"));
