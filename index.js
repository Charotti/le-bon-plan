const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const secret = "1rtyf6OZjepB63xRwyNSkk0czzttHKjXNQk000qzp";
const app = express();
const User = require("./models/userModel");
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
