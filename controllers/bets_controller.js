const express = require("express");
const router = express.Router();

const betRepo = require("../repositories/betRepository");
const recordLogRepo = require("../repositories/recordLogRepository");

module.exports = () => {
  // Get all data from database
  //--------------------front end js files need to match these names req.body._______
  router.post("/api/bet", (req, res) => {
    const bet = betRepo.addBet(
      req.user.id,
      req.body.guessRecord,
      req.body.guessShare
    );
    res.json(bet);
  });

  //returns the data for the memebrs page
  router.get("/api/members", (req, res) => {
    const bet = betRepo.getBet(req.user.id);
    const userTotalCoins = betRepo.getBetsTotalCoins(req.user.id);
    const recordLog = recordLogRepo.getRecordLog();
    const data = {
      studentName: req.user.studentName,
      todaysGuess: bet,
      totalCoins: userTotalCoins,
      actualToday: recordLog
    };
    res.json(data);
  });

  //return all bets for a specific user
  router.get("/api/allUserBets", (req, res) => {
    const bets = betRepo.getBets(req.user.id);
    res.json(bets);
  });
};
