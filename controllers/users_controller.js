const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const userRepo = require("../repositories/userRepository");

module.exports = () => {
  // Get all data from database
  router.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  router.post("/api/signup", (req, res) => {
    const user = userRepo.createUser(
      req.body.studentName,
      req.body.email,
      req.body.password
    );
    res.json(user);
  });

  app.post("/login", passport.authenticate("local"), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    const user = {
      id: req.user.id,
      email: req.user.email,
      studentName: req.user.studentName,
      createdAt: req.user.createdAt,
      updatedAt: req.user.upudatedAt
    };

    res.json(user);
  });

  //get 1 user
  router.get("/api/user", (req, res) => {
    const user = userRepo.getUser(req.query.userId);
    res.json(user);
  });

  //get all users
  router.get("/api/users", (req, res) => {
    const users = userRepo.getUsers();
    res.json(users);
  });
};
