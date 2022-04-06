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

const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const profileRouter = require("./routers/profileRouter");

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

app.get("/paris", (req, res) => {
  res.render("paris");
});

app.get("/lyon", (req, res) => {
  res.render("lyon");
});

app.get("/marseille", (req, res) => {
  res.render("marseille");
});
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/profile", profileRouter);

app.listen(8001, () => console.log("listening"));
