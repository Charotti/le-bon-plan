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
  req.res("products");
});

app.listen(8001, () => console.log("listening"));
