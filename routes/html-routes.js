// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const betRepo = require("../repositories/betRepository");
const recordLogRepo = require("../repositories/recordLogRepository");
const systemStatusRepo = require("../repositories/systemStatusRepository");
module.exports = function(app) {
  //Set Handlebars
  app.get("/", (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render("index", { user: req.user, layout: "main" });
  });
  app.get("/members", isAuthenticated, (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    const data = {
      guessRecord: 0,
      guessShare: 0,
      totalCoins: 0,
      actualRecord: 0,
      actualShare: 0,
      allowBets: systemStatusRepo.getAllowBetStatus().allowBets
    };
    betRepo
      .getBet(req.user)
      .then(bet => {
        if (bet) {
          data.guessRecord = bet.guessRecord;
          data.guessShare = bet.guessShare;
        }
        betRepo.getBetsTotalCoins(req.user).then(totalCoins => {
          data.totalCoins = totalCoins ? totalCoins : null;
          recordLogRepo.getRecordLog().then(recordLog => {
            if (recordLog) {
              data.actualRecord = recordLog.actualRecord;
              data.actualShare = recordLog.actualShare;
            }
            //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
            res.render("members", {
              user: req.user,
              userData: data,
              layout: "main"
            });
          });
        });
      })
      .catch(err => {
        res.json(err);
      });
  });
  app.get("/place-bet", isAuthenticated, (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    const data = {
      guessRecord: 0,
      guessShare: 0,
      totalCoins: 0,
      bettingDisabled: false,
      allowBets: systemStatusRepo.getAllowBetStatus().allowBets
    };
    betRepo
      .getBet(req.user)
      .then(bet => {
        if (bet) {
          data.guessRecord = bet.guessRecord;
          data.guessShare = bet.guessShare;
          data.bettingDisabled = false;
        }
        betRepo.getBetsTotalCoins(req.user).then(totalCoins => {
          data.totalCoins = totalCoins ? totalCoins : null;
          //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
          res.render("place-bet", {
            user: req.user,
            userData: data,
            layout: "main"
          });
        });
      })
      .catch(err => {
        res.json(err);
      });
  });
  app.get("/admin-update", isAuthenticated, (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    const data = {
      actualRecord: 0,
      actualShare: 0,
      recordId: 0,
      allowBets: systemStatusRepo.getAllowBetStatus().allowBets
    };
    recordLogRepo.getRecordLog().then(recordLog => {
      if (recordLog) {
        data.actualRecord = recordLog.actualRecord;
        data.actualShare = recordLog.actualShare;
        data.recordId = recordLog.id;
      }
    });
    res.render("admin-update", {
      user: req.user,
      userData: data,
      layout: "main"
    });
  });
  app.get("/signup", (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render("signup", { layout: "main" });
  });
  app.get("/about", (req, res) => {
    const data = {
      allowBets: systemStatusRepo.getAllowBetStatus().allowBets
    };
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render("about", { user: req.user, userData: data, layout: "main" });
  });
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
