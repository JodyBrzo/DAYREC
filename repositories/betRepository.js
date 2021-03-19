const db = require("../models/");

const addBet = (userId, guessRecord, guessShare) => {
  if (userId && guessRecord && guessShare) {
    db.Bet.create({
      userId,
      guessRecord,
      guessShare
    })
      .then(bet => {
        return bet;
      })
      .catch(err => {
        throw err;
      });
  }
};

//get bet for today
const getBet = userId => {
  if (userId) {
    db.Bet.findOne({
      where: {
        id: userId,
        createdAt: {
          [Op.gte]: new Date()
        }
      }
    })
      .then(bet => {
        return bet;
      })
      .catch(err => {
        throw err;
      });
  }
};

//returns the total coins for the user 
const getBetsTotalCoins = userId => {
  if (userId) {
    db.Bet.sum("awardedCoins", {
      where: {
        id: userId
      }
    })
      .then(bets => {
        return bets;
      })
      .catch(err => {
        throw err;
      });
  }
};

//returns all the users and their bets
const getBetRankings = () => {
  db.User.findAll({
    include: {
      model: Bet
    }
  })
    .then(usersWithBets => {
      return usersWithBets;
    })
    .catch(err => {
      throw err;
    });
};

//get user by ID and all of their bets
const getBets = userId => {
  if (userId) {
    db.User.findOne({
      where: {
        id: userId
      },
      include: {
        model: Bet
      },
    })
      .then(userWithBets => {
        return userWithBets;
      })
      .catch(err => {
        throw err;
      });
  }
};

module.exports = {
  addBet: addBet,
  getBet: getBet,
  getBetsTotalCoins: getBetsTotalCoins,
  getBetRankings: getBetRankings,
  getBets: getBets
};
