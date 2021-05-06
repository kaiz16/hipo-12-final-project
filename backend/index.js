const routes = require("./routes");

require("dotenv").config();
const express = require("express");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Users = require("./Models/User");
const app = express();

app.use(express.json())

mongoose.connect(process.env.MongoDB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("open", () => {
  console.log("Connected to DB.");
});

app.use(routes.router);
app.use('', require('./routes/pets.js'))

app.get("/", (req, res) => {
  res.send("Tinder For Pets - Backend");
});

app.listen(process.env.PORT, () => {
  console.log("App is now listening on Port" + process.env.PORT);
});
