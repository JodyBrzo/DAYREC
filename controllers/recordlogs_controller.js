// const express = require("express");
// const router = express.Router();

// const recordLogRepo = require("../repositories/recordLogRepository");
router.post("/api/recordlog", (req, res) => {
  const bet = betRepo.addBet(
    req.body.userId,
    req.body.actualRecord,
    req.body.actualShare
  );
  res.json(bet);
});
