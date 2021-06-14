const { router } = require("./routes");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

var corsOptions = {
  credentials: true,
  origin: /.*/, // allow from everywhere PS: you shouldn't do this in production, allow only from trusted domains
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MongoDB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 0,
});

mongoose.connection.on("open", () => {
  console.log("Connected to Database.");
});

// Routes
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("🚀 App is now listening on port " + process.env.PORT);
});