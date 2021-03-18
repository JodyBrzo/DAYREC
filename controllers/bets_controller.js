const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const db = require("../models/");

module.exports = (app) => {
  // Get all data from database
  router.post("/api/bets", (req, res) => {
    db.bets
      .create([""])({})
      .then(results  => res.json(results));
  });
};
