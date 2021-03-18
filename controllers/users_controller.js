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
