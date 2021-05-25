const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { ensureAuthenticated } = require("./routes/auth");
const app = express();

var corsOptions = {
  credentials: true,
  origin: /^http:\/\/localhost:.*/,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MongoDB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("open", () => {
  console.log("Connected to DB.");
});

// app.use(express.json);
// app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Express Session
app.use(
  session({
    secret: "THC HIPO 12 - Tinder For Pets",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      mongoUrl: process.env.MongoDB,
    }),
  })
);

// Routes
app.use(routes.router);
app.use("", require("./routes/pets.js"));

app.get("/", (req, res) => {
  res.send("Tinder For Pets - Backend");
});

app.get("/test", ensureAuthenticated, (req, res) => {
  res.send("Tinder For Pets - Backend has ensured authenticated");
});

app.listen(process.env.PORT, () => {
  console.log("App is now listening on Port " + process.env.PORT);
});
