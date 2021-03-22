const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const userRepo = require("../repositories/userRepository");

module.exports = () => {
  // when user logs on we send you back the student name
  router.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({ studentName: req.user.studentName });
  });

  //when a user signs up we create the user and send back studentName
  router.post("/api/signup", (req, res) => {
    const userDb = userRepo.createUser(
      req.body.studentName,
      req.body.email,
      req.body.password
    );

    res.json({ studentName: userDb.studentName });
  });

  //get 1 user - not in use at the moment
  router.get("/api/user", (req, res) => {
    const user = userRepo.getUser(req.query.userId);
    res.json(user);
  });

  //get all users - not in use at the moment
  router.get("/api/users", (req, res) => {
    const users = userRepo.getUsers();
    res.json(users);
  });
};
