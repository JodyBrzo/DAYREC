
const express = require("express");
const router = express.Router();

const userRepo = require("../repositories/userRepository");

module.exports = () => {
  // Get all data from database
  router.post("/api/signup", (req, res) => {
    const user = userRepo.createUser(
      req.body.studentName,
      req.body.email,
      req.body.password
    );
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

const { Router } = require("express");
const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const db = require("../models/");

module.exports = (app) => {
  // Get all data from database
  router.get("/api/", (req, res) => {
    db.user.findAll({}).then((results) => res.json(results));
  });

  // User gets to put in their name
  router.get("/api/signup", (req, res) => {
    user
      .findAll({
        where: {
          studentName: req.params.user,
        },
      })
      .then((results) => res.json(results));
  });
};

