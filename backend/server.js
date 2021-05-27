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
  origin: /.*/, // allow from everywhere PS: you shouldn't do this in production, allow only from trusted domains
};
app.use(cors(corsOptions));
app.use(express.json());
app.enable('trust proxy');
var sessionOptions = {
  proxy: true,
  saveUninitialized: false, // saved new sessions
  resave: false, // do not automatically write to the session store
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    mongoUrl: process.env.MongoDB,
  }),
  secret: "THC HIPO 12 - Tinder For Pets",
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

mongoose.connect(process.env.MongoDB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 0,
});

mongoose.connection.on("open", () => {
  console.log("Connected to DB.");
});

// app.use(express.json);
// app.use(express.urlencoded({extended:false}));
app.use(cookieParser(sessionOptions.secret))

app.use(session(sessionOptions))
// // Express Session
// app.use(
//   session({
//     secret: "THC HIPO 12 - Tinder For Pets",
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//       mongoUrl: process.env.MongoDB,
//     }),
//   })
// );

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