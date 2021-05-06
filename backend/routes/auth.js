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
  
  // Renders
  app.get('/auth/success', (req, res) => {
    res.send("Tinder For Pets - LOGGED IN COMPLETE");
  });

  app.get('/auth/fail', (req, res) => {
    res.send("Tinder For Pets - LOGGED IN FAIL");
  });

  app.get('/auth/registered', (req, res) => {
    res.send("Tinder For Pets - You already have an account. Go to /login");
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  
  // Post Requests
  app.post("/register", function (req, res) {
    console.log(req.query)
    User.register(
      new User({
        email: req.query.email,
        username: req.query.username,
      }),
      req.query.password,
      function (err, user) {
        if (err) {
          console.log("error is",err);
          return res.redirect('/auth/registered');
        }
        passport.authenticate("local")(req, res, function () {
          res.redirect("/auth/success");
        });
      }
    );
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/auth/success",
      failureRedirect: "/auth/fail",
    }),
    function (req, res) {}
  );

};

module.exports = {
  installPassport,
};
