require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

var db = require("./database/db");
db.connectDb();

var user_routes = require("./routes/userRoutes");
var post_routes = require("./routes/postRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors("*"));

app.use("/users", user_routes);
app.use("/posts", post_routes);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
