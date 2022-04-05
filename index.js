const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

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
