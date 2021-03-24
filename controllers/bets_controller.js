const betRepo = require("../repositories/betRepository");
const recordLogRepo = require("../repositories/recordLogRepository");

module.exports = app => {
  // Get all data from database
  //--------------------front end js files need to match these names req.body._______
  app.post("/api/bet", (req, res) => {
    betRepo
      .getBet(req.user)
      .then(betToday => {
        if (!betToday || !betToday.dataValues) {
          betRepo
            .addBet(req.user, req.body.guessRecord, req.body.guessShare)
            .then(bet => {
              res.json(bet);
            })
            .catch(err => {
              res.json(err);
            });
        } else {
          res.json(betToday.dataValues);
        }
      })
      .catch(err => {
        res.json(err);
      });
  });

  //returns the data for the memebrs page
  app.get("/api/members", (req, res) => {
    const data = {
      studentName: req.user.studentName
    };

    betRepo
      .getBet(req.user)
      .then(bet => {
        data.todaysGuess = bet ? bet : null;

        betRepo.getBetsTotalCoins(req.user).then(totalCoins => {
          data.userTotalCoins = totalCoins ? totalCoins : null;

          recordLogRepo.getRecordLog().then(recordLog => {
            data.actualToday = recordLog ? recordLog : null;

            res.json(data);
          });
        });
      })
      .catch(err => {
        res.json(err);
      });
  });

  //return all bets for a specific user
  app.get("/api/allUserBets", (req, res) => {
    betRepo
      .getBets(req.user.id)
      .then(bets => {
        res.json(bets);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
