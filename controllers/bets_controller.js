
const express = require("express");
const router = express.Router();

const betRepo = require("../repositories/betRepository");

module.exports = () => {
  // Get all data from database
  //--------------------front end js files need to match these names req.body._______
  router.post("/api/bet", (req, res) => {
    const bet = betRepo.addBet(
      req.body.userId,
      req.body.guessRecord,
      req.body.guessShare
    );
    res.json(bet);
  });

  router.get("/api/bet", (req, res) => {
    const bet = userRepo.getBet(req.query.userId);
    res.json(bet);
  });

  router.get("/api/bets", (req, res) => {
    const bets = userRepo.getBets(req.query.userId);
    res.json(bets);
  });
};

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

