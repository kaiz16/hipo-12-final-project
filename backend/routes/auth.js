require("dotenv").config();
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../Models/User");



const installPassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use(new LocalStrategy(User.authenticate()));

  // app.get("/", function (req, res) {
  //   res.render("home");
  // });

  // app.get("/secret", isLoggedIn, function (req, res) {
  //   res.render("secret");
  // });

  // app.get("/register", function (req, res) {
  //   res.render("register");
  // });

  app.post("/register", function (req, res) {
    User.register(
      new Users({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }),
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secret");
        });
      }
    );
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    }),
    function (req, res) {}
  );

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
};

module.exports = {
  installPassport,
};
