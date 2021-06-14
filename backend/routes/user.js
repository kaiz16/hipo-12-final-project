const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../functions/verifyToken");
// register users
router.post("/register", async (req, res) => {
  let { name, username, email, password } = req.body;
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    user.save();

    res.status(200).send(user);
  } catch (error) {
    return res.status(400).send("Error while registering a user");
  }
});

// user login
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  // user must be registered to login
  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).send("Please register first.");
  }

  // check user's password
  let matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return res.status(400).send("Password is wrong.");
  }

  let payload = {
    ...user._doc
  };

  delete payload.password
  // sign our JWT using our secret key (Your secret key should be unique and secure)
  let token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
    expiresIn: "1h",
  });

  // finally if everything went OK. return JWT
  res.status(200).json({
    token: token,
  });
});

router.get("/me", verifyToken, async (req, res) => {

  res.json(req.user);
});

router.get("/users", verifyToken, async (req, res) => {
  let users = await User.find({}, { password: 0 });
  res.json(users);
});

module.exports = router;
