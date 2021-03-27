const betRepo = require("../repositories/betRepository");
const { getRecordLog } = require("../repositories/recordLogRepository");
const recordLogRepo = require("../repositories/recordLogRepository");
const systemStatusRepo = require("../repositories/systemStatusRepository");

module.exports = app => {
  app.put("/api/allowBets", (req, res) => {
    if (req.user.isAdmin) {
      const allowBetStatus = parseBoolean(req.body.allowBetStatus);
      systemStatusRepo.setAllowBetStatus(
        allowBetStatus //admin field should be called allowBetStatus
      );
      getRecordLog().then(record => {
        if (!record) {
            recordLogRepo
              .addRecordLog(0, 0)
              .then(recordLog => {
                res.json({ 
                  recordId: recordLog.id,
                  allowBetStatus: allowBetStatus 
                })
                .catch(err => {
                res.json(err);
              });
            })
            .catch(err => {
              res.json(err);
            });
        }
        res.json({ 
          recordId: record.id,
          allowBetStatus: allowBetStatus 
        });
      });
    } else {
      res.status(405);
    }
  });

  //done
  app.put("/api/setActualRecordLog", (req, res) => {
    if (req.user.isAdmin) {

      getRecordLog().then(record => {
        if (!record) {
            recordLogRepo
              .addRecordLog(0, 0)
              .then(recordLog => {
                res.json(recordLog);
              })
              .catch(err => {
              res.json(err);
            })
            .catch(err => {
              res.json(err);
            });
        } else {
          recordLogRepo
          .updateActualRecordLog(
            req.body.recordId,
            req.body.actualRecord,
            req.body.actualShare
          )
          .then(recordLog => {
            recordLogRepo.getRecordLog().then(recordLogToday => {
              res.json(recordLogToday);
            });
          })
        }
      });
    } else {
      res.status(405);
    }
  });

  //
  app.get("/api/assignUserPayouts", (req, res) => {
    if (req.user.isAdmin) {
      betRepo
        .getAllBets()
        .then(bets => {
          const originalBets = bets.map(x => {
            return {
              id: x.id,
              UserId: x.UserId,
              awardedCoins: x.awardedCoins,
              createdAt: x.createdAt,
              updatedAt: x.updatedAt,
              guessRecord: x.guessRecord,
              guessShare: x.guessShare
            };
          });
          recordLogRepo
            .getAllRecordLogs()
            .then(recordLogs => {
              recordLogs.forEach(record => {
                const recordDate = record.createdAt;

                bets.forEach(bet => {
                  const betDate = bet.createdAt;
                  if (betDate === recordDate) {
                    let totalAwardedCoins = 0;
                    if (bet.guessRecord === record.actualRecord) {
                      totalAwardedCoins += 100;
                    }
                    if (bet.guessShare === record.actualShare) {
                      totalAwardedCoins += 100;
                    }
                    if (
                      bet.guessShare === record.actualShare &&
                      bet.guessRecord === record.actualRecord
                    ) {
                      totalAwardedCoins += 100;
                    }
                    bet.awardedCoins = totalAwardedCoins;
                    betRepo
                      .updateBetAwardedCoins(bet.id, totalAwardedCoins)
                      .then(x => x);
                  }
                });
              });

              const data = {
                originalBets: originalBets,
                bets: bets,
                recordLogs: recordLogs
              };

              res.json(data);
            })
            .catch(err => {
              res.json(err);
            });
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.status(405);
    }
  });

  //done
  app.get("/api/recordLogs", (req, res) => {
    if (req.user.isAdmin) {
      recordLogRepo
        .getAllRecordLogs()
        .then(recordLogs => {
          res.json(recordLogs);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.status(405);
    }
  });

  const parseBoolean = booleanText => {
    const text = new String(booleanText);
    const bool = (() => {
      switch (false) {
        case text.toLowerCase() !== "true":
          return true;
        case text.toLowerCase() !== "false":
          return false;
      }
    })();
    if (typeof bool === "boolean") {
      return bool;
    }
    return void 0;
  };
};
